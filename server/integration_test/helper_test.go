package integrationtests_test

import (
	"fmt"
	l "log"
	"math"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/go-resty/resty/v2"

	"chess-alpha/server/adapter/clock"
	"chess-alpha/server/adapter/database/model"
	"chess-alpha/server/adapter/ulid"
	"chess-alpha/server/log"
	"chess-alpha/server/usecase/output_port"
	mock_port "chess-alpha/server/usecase/output_port_mock"

	"chess-alpha/server/adapter/database"
	"chess-alpha/server/api/router"
	"chess-alpha/server/usecase/interactor"

	"gorm.io/gorm"
)

var (
	testDB *gorm.DB
)

// 初回読み込み時にテスト用DBと接続し、Migrationを実行
func init() {
	var err error
	logger, _ := log.NewLogger()

	// MySQLの起動を待つ
	const retryMax = 10
	for i := 0; i < retryMax; i++ {
		testDB, err = database.NewMySQLDB(logger, false)
		if err == nil {
			break
		}
		if i == retryMax-1 {
			panic(fmt.Sprintf("failed to connect to database: %v", err))
		}
		duration := time.Millisecond * time.Duration(math.Pow(1.5, float64(i))*1000)
		l.Printf("failed to connect to database retrying: %v: %v\n", err, duration)
		time.Sleep(duration)
	}

	if err := database.Migrate(testDB); err != nil {
		panic(err)
	}
}

type mockList struct {
	Ulid  *mock_port.MockULID
	Auth  *mock_port.MockUserAuth
	Clock *mock_port.MockClock
}

type mockFunc func() mockList

func NewTestServer(t *testing.T, tx *gorm.DB, f mockFunc) (s *httptest.Server, restyClient *resty.Client) {
	t.Helper()

	mocks := f()

	// ulidとclockはmockが設定されてない場合, 実体を注入する
	var ulidDriver output_port.ULID
	if mocks.Ulid == nil {
		ulidDriver = ulid.NewULID()
	} else {
		ulidDriver = mocks.Ulid
	}

	var clockDriver output_port.Clock
	if mocks.Clock == nil {
		clockDriver = clock.New()
	} else {
		clockDriver = mocks.Clock
	}

	transaction := database.NewGormTransaction(tx)
	userRepo := database.NewUserRepository(tx, mocks.Ulid)
	healthCheckRepo := database.NewHealthCheckRepository(tx)

	userUC := interactor.NewUserUseCase(
		clockDriver,
		ulidDriver,
		transaction,
		mocks.Auth,
		userRepo,
	)
	healthCheckUC := interactor.NewHealthCheckUseCase(healthCheckRepo)

	e := router.NewServer(
		userUC,
		healthCheckUC,
		false,
	)

	s = httptest.NewServer(e.Server.Handler)

	t.Cleanup(func() {
		s.Close()
		tx.Rollback()
	})

	// HTTPクライアント
	restyClient = resty.New()
	return
}

func addTestUser(t *testing.T, tx *gorm.DB, suffix int) *model.User {
	t.Helper()

	user := &model.User{
		UserID:         fmt.Sprintf("testUserId%d", suffix),
		LoginID:        fmt.Sprintf("%06d", suffix),
		Name:           fmt.Sprintf("testName%d", suffix),
		Rate:           1000 + suffix,
		HashedPassword: fmt.Sprintf("HashedPassword%d", suffix),
	}

	if err := tx.Create(user).Error; err != nil {
		t.Fatal(err)
	}

	return user
}
