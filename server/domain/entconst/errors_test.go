package entconst_test

import (
	"chess-alpha/server/domain/entconst"
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewValidationError(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  error
		want string
	}{
		{
			name: "success",
			err:  errors.New("sample error"),
			want: "validation error: sample error",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationError(tt.err)
			if ve == nil {
				t.Fatalf("NewValidationError() returned nil")
			}
			if ve.Error() != tt.want {
				t.Errorf("Error() = %v, want %v", ve.Error(), tt.want)
			}
		})
	}
}

func TestNewValidationErrorFromMsg(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		msg         string
		wantMessage string
	}{
		{
			name:        "success valid error message",
			msg:         "field is required",
			wantMessage: "validation error: field is required",
		},
		{
			name:        "fail empty error message",
			msg:         "",
			wantMessage: "validation error: ",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationErrorFromMsg(tt.msg)
			if ve == nil {
				t.Fatalf("NewValidationErrorFromMsg() returned nil")
			}
			if ve.Error() != tt.wantMessage {
				t.Errorf("Error() = %v, want %v", ve.Error(), tt.wantMessage)
			}
		})
	}
}

func TestValidationErrorErrorMessage(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		msg         string
		wantMessage string
	}{
		{
			name:        "success valid error message",
			msg:         "field is required",
			wantMessage: "validation error: field is required",
		},
		{
			name:        "fail empty error message",
			msg:         "",
			wantMessage: "validation error: ",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationErrorFromMsg(tt.msg)
			if ve.Error() != tt.wantMessage {
				t.Errorf("Error() = %v, want %v", ve.Error(), tt.wantMessage)
			}
		})
	}
}

func TestValidationErrorUnwrap(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		err         error
		wantMessage string
	}{
		{
			name:        "success valid error message",
			err:         errors.New("field is required"),
			wantMessage: "field is required",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationError(tt.err)
			unwrappedErr := ve.Unwrap()
			if unwrappedErr.Error() != tt.wantMessage {
				t.Errorf("Unwrap() = %v, want %v", unwrappedErr.Error(), tt.wantMessage)
			}
		})
	}
}

func TestValidationErrorIs(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name      string
		msg       string
		targetErr error
		wantIs    bool
	}{
		{
			name:      "success same error type",
			msg:       "field is required",
			targetErr: entconst.NewValidationErrorFromMsg("field is required"),
			wantIs:    true,
		},
		{
			name:      "fail different error type",
			msg:       "field is required",
			targetErr: entconst.NewNotFoundErrorFromMsg("some other error"),
			wantIs:    false,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationErrorFromMsg(tt.msg)
			if errors.Is(ve, tt.targetErr) != tt.wantIs {
				t.Errorf("Is() = %v, want %v", errors.Is(ve, tt.targetErr), tt.wantIs)
			}
		})
	}
}

func TestNotFoundError(t *testing.T) {
	t.Parallel()

	// Test case for NotFoundError
	err := entconst.NewNotFoundErrorFromMsg("123 is not found")
	expectedResponse := "notfound error: 123 is not found"
	expectedUnwrappedResponse := "123 is not found"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("エラーがNotFoundErrorの型であることを確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &entconst.NotFoundError{}), "エラーの型がNotFoundErrorではありません。実際: %v, 期待: %v", err, &entconst.NotFoundError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if assertedError, ok := err.(*entconst.NotFoundError); ok {
			if unwrappedErr := assertedError.Unwrap(); unwrappedErr != nil {
				assert.Equal(t, expectedUnwrappedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedUnwrappedResponse)
			} else {
				t.Error("Unwrapされたエラーがnilです")
			}
		}
	})

	// Check false case for Is method
	t.Run("NotFoundErrorのIsメソッドのfalseケース", func(t *testing.T) {
		t.Parallel()
		err := entconst.NewNotFoundErrorFromMsg("123 is not found")
		assert.False(t, errors.Is(err, &entconst.ValidationError{}), "エラーがValidationErrorの型として検出されましたが、期待されません。")
	})
}

func TestNewConflictError(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  error
		want string
	}{
		{
			name: "success",
			err:  errors.New("sample error"),
			want: "conflict error: sample error",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ce := entconst.NewConflictError(tt.err)
			if ce == nil {
				t.Fatalf("NewConflictError() returned nil")
			}
			if ce.Error() != tt.want {
				t.Errorf("Error() = %v, want %v", ce.Error(), tt.want)
			}
		})
	}
}

func TestConflictError(t *testing.T) {
	t.Parallel()

	err := entconst.NewConflictErrorFromMsg("123 is already exist")
	expectedResponse := "conflict error: 123 is already exist"
	expectedUnwrappedResponse := "123 is already exist"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("コンフリクトしたことを確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &entconst.ConflictError{}), "エラーの型がConflictではありません。実際: %v, 期待: %v", err, entconst.ConflictError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedUnwrappedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	t.Run("ConflictErrorのIsメソッドのfalseケースを確認", func(t *testing.T) {
		t.Parallel()
		err := entconst.NewConflictErrorFromMsg("123 is already exist")
		assert.False(t, errors.Is(err, &entconst.ValidationError{}), "エラーがValidationErrorの型として検出されましたが、期待されません。")
	})
}

func TestForbiddenError(t *testing.T) {
	t.Parallel()

	err := entconst.NewForbiddenError("admin", "user")
	expectedResponse := "forbidden error: required permission: admin.your current permission: user"
	expectedUnwrappedResponse := "required permission: admin.your current permission: user"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("ForbiddenErrorの確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &entconst.ForbiddenError{}), "エラーの型がForbiddenErrorではありません。実際: %v, 期待: %v", err, &entconst.ForbiddenError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedUnwrappedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	t.Run("ForbiddenErrorのIsメソッドのfalseケースを確認", func(t *testing.T) {
		t.Parallel()
		err := entconst.NewForbiddenError("admin", "user")
		assert.False(t, errors.Is(err, &entconst.ValidationError{}), "エラーがValidationErrorの型として検出されましたが、期待されません。")
	})
}

func TestNewForbiddenErrorFromMsg(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		msg         string
		wantMessage string
	}{
		{
			name:        "success",
			msg:         "sample error",
			wantMessage: "forbidden error: sample error",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			fe := entconst.NewForbiddenErrorFromMsg(tt.msg)
			if fe == nil {
				t.Fatalf("NewForbiddenErrorFromMsg() returned nil")
			}
			if fe.Error() != tt.wantMessage {
				t.Errorf("Error() = %v, want %v", fe.Error(), tt.wantMessage)
			}
		})
	}
}

func TestNewUnauthorizedError(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  error
		want string
	}{
		{
			name: "success",
			err:  errors.New("sample error"),
			want: "unauthorized error: sample error",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ue := entconst.NewUnauthorizedError(tt.err)
			if ue == nil {
				t.Fatalf("NewUnauthorizedError() returned nil")
			}
			if ue.Error() != tt.want {
				t.Errorf("Error() = %v, want %v", ue.Error(), tt.want)
			}
		})
	}
}

func TestNewHasNoPermissionError(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  error
		want string
	}{
		{
			name: "success",
			err:  errors.New("sample error"),
			want: "has no permission error: sample error",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			hnpe := entconst.NewHasNoPermissionError(tt.err)
			if hnpe == nil {
				t.Fatalf("NewHasNoPermissionError() returned nil")
			}
			if hnpe.Error() != tt.want {
				t.Errorf("Error() = %v, want %v", hnpe.Error(), tt.want)
			}
		})
	}
}

func TestNewHasNoPermissionFromMsg(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		msg         string
		wantMessage string
	}{
		{
			name:        "success",
			msg:         "sample error",
			wantMessage: "has no permission error: sample error",
		},
		{
			name:        "empty",
			msg:         "",
			wantMessage: "has no permission error: ",
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			hnpe := entconst.NewHasNoPermissionErrorFromMsg(tt.msg)
			if hnpe == nil {
				t.Fatalf("NewHasNoPermissionErrorFromMsg() returned nil")
			}
			if hnpe.Error() != tt.wantMessage {
				t.Errorf("Error() = %v, want %v", hnpe.Error(), tt.wantMessage)
			}
		})
	}
}

func TestHasNoPermissionErrorUnwrapMessage(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  error
	}{
		{
			name: "success",
			err:  errors.New("sample error"),
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := entconst.NewHasNoPermissionError(tt.err)
			hnpErr, ok := err.(*entconst.HasNoPermissionError)
			if !ok {
				t.Fatalf("err = %T, want HasNoPermissionError", err)
			}
			unwrappedErr := hnpErr.Unwrap()
			if unwrappedErr != tt.err {
				t.Errorf("inner = %v, want %v", unwrappedErr, tt.err)
			}
		})
	}
}
