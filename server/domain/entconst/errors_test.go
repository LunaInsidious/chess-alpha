package entconst_test

import (
	"errors"
	"testing"

	"chess-alpha/server/domain/entconst"
)

func TestNewValidationError(t *testing.T) {
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
			ve := entconst.NewValidationError(tt.msg)
			if ve == nil {
				t.Fatalf("NewValidationError() returned nil")
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
			ve := entconst.NewValidationError(tt.msg)
			if ve.Error() != tt.wantMessage {
				t.Errorf("Error() = %v, want %v", ve.Error(), tt.wantMessage)
			}
		})
	}
}

func TestValidationErrorUnwrapMessage(t *testing.T) {
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
			ve := entconst.NewValidationError(tt.msg)
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
			targetErr: entconst.NewValidationError("field is required"),
			wantIs:    true,
		},
		{
			name:      "fail different error type",
			msg:       "field is required",
			targetErr: errors.New("some other error"),
			wantIs:    false,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			ve := entconst.NewValidationError(tt.msg)
			if errors.Is(ve, tt.targetErr) != tt.wantIs {
				t.Errorf("Is() = %v, want %v", errors.Is(ve, tt.targetErr), tt.wantIs)
			}
		})
	}
}
