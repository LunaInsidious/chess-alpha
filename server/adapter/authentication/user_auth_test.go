package authentication_test

import (
	"errors"
	"fmt"
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"chess-alpha/server/adapter/authentication"
	"chess-alpha/server/domain/entity"
)

func TestAuthenticate(t *testing.T) {
	t.Parallel()

	user := entity.User{
		UserID: "testID",
	}
	userAuth := authentication.NewUserAuth()

	type issueFunc func(user entity.User, issuedAt time.Time) (string, error)
	tests := []struct {
		name        string
		issueFunc   issueFunc
		issuedAt    time.Time
		expectedRes string
		expectedErr error
	}{
		{
			name:        "成功",
			issueFunc:   userAuth.IssueUserToken,
			issuedAt:    time.Now().AddDate(0, 0, -2),
			expectedRes: "testID",
			expectedErr: nil,
		},
		{
			name:        "失敗; 期限切れ",
			issueFunc:   userAuth.IssueUserToken,
			issuedAt:    time.Now().AddDate(0, 0, -8),
			expectedRes: "",
			expectedErr: jwt.ErrTokenExpired,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			token, err := tt.issueFunc(user, tt.issuedAt)
			if err != nil {
				t.Fatal(err)
			}

			res, err := userAuth.Authenticate(token)
			fmt.Printf("err: %v\n", err)
			assertAuthenticateRes(t, res, tt.expectedRes, err, tt.expectedErr)
		})
	}
}

func assertAuthenticateRes(t *testing.T, res, expectedRes string, err, expectedErr error) {
	t.Helper()

	diffs := make([]string, 0, 2)
	if res != expectedRes {
		diffs = append(diffs, fmt.Sprintf(
			"\nuserAuth.Authenticateのresが異なります。got: %#v, want: %#v ",
			res,
			expectedRes,
		))
	}
	if expectedErr != nil && !errors.Is(err, expectedErr) {
		diffs = append(diffs, fmt.Sprintf(
			"\nuserAuth.Authenticateのerrが異なります。got: %#v, want: %#v ",
			err,
			expectedErr,
		))
	}
	if len(diffs) != 0 {
		t.Fatal(diffs)
	}
}
