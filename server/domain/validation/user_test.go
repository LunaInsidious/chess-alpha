package validation_test

import (
	"errors"
	"testing"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/validation"
)

var (
	testCharacter255EmailAddress = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrsdtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234@example.com"
	testCharacter256EmailAddress = "abcdefghijklmnopqrsotuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghjkslmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghitete@test.com"
	testCharacter256Password     = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstvwxyzabcdefghijklsmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrestuvwxyzabcdefghijklmnopqrstuv"
)

func TestValidateEmail(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		input string
		want  error
	}{
		{
			name:  "成功; ",
			input: "valid@example.com",
			want:  nil,
		},
		{
			name:  "成功;",
			input: testCharacter255EmailAddress,
			want:  nil,
		},
		{
			name:  "失敗; validation error",
			input: "invalid",
			want:  entconst.NewValidationError("email address is invalid"),
		},
		{
			name:  "失敗; validation error (domain)",
			input: "invalid@example_test.com",
			want:  entconst.NewValidationError("email address is invalid"),
		},
		{
			name:  "失敗; too long email address",
			input: testCharacter256EmailAddress,
			want:  entconst.NewValidationError("email address is too long"),
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := validation.ValidateEmail(tt.input)
			if !errors.Is(err, tt.want) {
				t.Errorf("ValidateEmail error = %v, wantErr %v", err, tt.want)
				return
			}
		})
	}
}

func TestValidatePassword(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		input string
		want  error
	}{
		{
			name:  "成功",
			input: "password",
			want:  nil,
		},
		{
			name:  "失敗; validation error",
			input: "invalid!",
			want:  entconst.NewValidationError("password is invalid"),
		},
		{
			name:  "失敗; too long password",
			input: testCharacter256Password,
			want:  entconst.NewValidationError("password is too long"),
		},
		{
			name:  "失敗; too short password(7文字)",
			input: "example",
			want:  entconst.NewValidationError("password is too short"),
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := validation.ValidatePassword(tt.input)
			if !errors.Is(err, tt.want) {
				t.Errorf("ValidatePassword error = %v, wantErr %v", err, tt.want)
				return
			}
		})
	}
}
