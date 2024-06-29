package integrationtests_test

import (
	"net/http"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/google/go-cmp/cmp/cmpopts"

	"chess-alpha/server/domain/entconst"
	mock_port "chess-alpha/server/usecase/output_port_mock"

	"github.com/go-resty/resty/v2"
	"github.com/google/go-cmp/cmp"
	"github.com/labstack/echo/v4"

	"chess-alpha/server/api/schema"
)

// GET api/user/me
// nolint:paralleltest
func TestFindMe(t *testing.T) {
	tx := testDB.Begin()
	t.Cleanup(func() {
		tx.Rollback()
	})

	// 初期状態の設定
	user := addTestUser(t, tx, 1)
	// テストケース
	tests := []struct {
		name        string
		successCase bool
		wantCode    int
		request     func(findMeRes *schema.UserRes, errRes *echo.HTTPError) (resp *resty.Response, err error)
		wantRes     *schema.UserRes
		wantErr     *echo.HTTPError
	}{
		{
			name:        "成功",
			successCase: true,
			wantCode:    200,
			request: func(findMeRes *schema.UserRes, errRes *echo.HTTPError) (resp *resty.Response, err error) {
				ctrl := gomock.NewController(t)
				defer ctrl.Finish()
				s, c := NewTestServer(t, tx, func() (m mockList) {
					m.Auth = mock_port.NewMockUserAuth(ctrl)
					m.Auth.EXPECT().Authenticate("token").Return(user.UserID, nil)
					return
				})
				resp, err = c.R().
					SetError(errRes).
					SetHeader("Authorization", "Bearer token").
					SetResult(findMeRes).
					Get(s.URL + "/api/user/me")
				return
			},
			wantRes: &schema.UserRes{
				UserID:  user.UserID,
				LoginID: user.LoginID,
				Name:    user.Name,
				Rate:    user.Rate,
			},
			wantErr: nil,
		},
		{
			name:        "失敗: ログインしていない",
			successCase: false,
			wantCode:    401,
			request: func(findMeRes *schema.UserRes, errRes *echo.HTTPError) (resp *resty.Response, err error) {
				ctrl := gomock.NewController(t)
				defer ctrl.Finish()
				s, c := NewTestServer(t, tx, func() (m mockList) { return })
				resp, err = c.R().
					SetHeader("Authorization", ""). // Authorizationヘッダが空
					SetError(errRes).
					Get(s.URL + "/api/user/me")
				return
			},
			wantRes: nil,
			wantErr: echo.NewHTTPError(http.StatusUnauthorized, entconst.NewUnauthorizedErrorFromMsg("token is invalid").Error()),
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			res := &schema.UserRes{}
			errRes := &echo.HTTPError{}
			resp, err := tt.request(res, errRes)
			if err != nil {
				t.Fatal(err)
			}
			if resp.StatusCode() != tt.wantCode {
				t.Errorf("Status Code %d, want = %d", resp.StatusCode(), tt.wantCode)
			}
			if tt.successCase && !cmp.Equal(res, tt.wantRes) {
				t.Errorf("FindMe Response diff =%v", cmp.Diff(res, tt.wantRes))
				return
			}
			if diff := cmp.Diff(errRes, tt.wantErr, cmpopts.IgnoreFields(*errRes, "Code")); !tt.successCase && diff != "" {
				t.Errorf("FindMe Response diff =%v", diff)
			}
		})
	}
}
