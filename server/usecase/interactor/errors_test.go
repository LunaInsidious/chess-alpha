package interactor_test

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"

	"chess-alpha/server/usecase/interactor"
)

func TestNotFoundError(t *testing.T) {
	t.Parallel()

	// Test case for NotFoundError
	err := interactor.NewNotFoundError("user", "123")
	expectedResponse := "not found error: user: 123 is not found"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("エラーがNotFoundErrorの型であることを確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &interactor.NotFoundError{}), "エラーの型がNotFoundErrorではありません。実際: %v, 期待: %v", err, &interactor.NotFoundError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	// Check false case for Is method
	t.Run("NotFoundErrorのIsメソッドのfalseケース", func(t *testing.T) {
		t.Parallel()
		err := interactor.NewNotFoundError("user", "123")
		assert.False(t, errors.Is(err, &interactor.BadRequestError{}), "エラーがBadRequestErrorの型として検出されましたが、期待されません。")
	})
}

func TestConflictError(t *testing.T) {
	t.Parallel()

	err := interactor.NewConflictError("user", "123")
	expectedResponse := "conflict error: user: 123 is already exist"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("コンフリクトしたことを確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &interactor.ConflictError{}), "エラーの型がConflictではありません。実際: %v, 期待: %v", err, &interactor.NotFoundError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	t.Run("ConflictErrorのIsメソッドのfalseケースを確認", func(t *testing.T) {
		t.Parallel()
		err := interactor.NewConflictError("user", "123")
		assert.False(t, errors.Is(err, &interactor.BadRequestError{}), "エラーがBadRequestErrorの型として検出されましたが、期待されません。")
	})
}

func TestForbiddenError(t *testing.T) {
	t.Parallel()

	err := interactor.NewForbiddenError("admin", "user")
	expectedResponse := "forbidden error: required permission: admin.your current permission: user"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("ForbiddenErrorの確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &interactor.ForbiddenError{}), "エラーの型がForbiddenErrorではありません。実際: %v, 期待: %v", err, &interactor.ForbiddenError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	t.Run("ForbiddenErrorのIsメソッドのfalseケースを確認", func(t *testing.T) {
		t.Parallel()
		err := interactor.NewForbiddenError("admin", "user")
		assert.False(t, errors.Is(err, &interactor.BadRequestError{}), "エラーがBadRequestErrorの型として検出されましたが、期待されません。")
	})
}

func TestBadRequestError(t *testing.T) {
	t.Parallel()

	err := interactor.NewBadRequestError("invalid input")
	expectedResponse := "bad request error: invalid input"

	t.Run("エラーメッセージが正しいことを確認", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, expectedResponse, err.Error(), "エラーメッセージが期待通りではありません。実際: %v, 期待: %v", err.Error(), expectedResponse)
	})

	t.Run("BadRequestErrorの確認", func(t *testing.T) {
		t.Parallel()
		assert.True(t, errors.Is(err, &interactor.BadRequestError{}), "エラーの型がBadRequestErrorではありません。実際: %v, 期待: %v", err, &interactor.ForbiddenError{})
	})

	t.Run("Unwrapメソッドの確認", func(t *testing.T) {
		t.Parallel()
		if unwrappedErr := err.Unwrap(); unwrappedErr != nil {
			assert.Equal(t, expectedResponse, unwrappedErr.Error(), "Unwrapされたエラーメッセージが期待通りではありません。実際: %v, 期待: %v", unwrappedErr.Error(), expectedResponse)
		} else {
			t.Error("Unwrapされたエラーがnilです")
		}
	})

	t.Run("BadRequestError Is() false case", func(t *testing.T) {
		t.Parallel()
		err := interactor.NewBadRequestError("invalid input")
		assert.False(t, errors.Is(err, &interactor.ForbiddenError{}), "Is() = true, want false")
	})
}
