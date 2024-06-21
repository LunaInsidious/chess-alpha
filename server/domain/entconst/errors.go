package entconst

import (
	"fmt"
)

// ValidationError is a custom error type
type ValidationError struct {
	msg string
}

// NewValidationError a new ValidationError with a custom message
func NewValidationError(msg string) *ValidationError {
	return &ValidationError{msg: msg}
}

// Error returns the error message for ValidationError
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error: %s", e.msg)
}

// Unwrap returns the error message for ValidationError
func (e *ValidationError) Unwrap() error {
	return fmt.Errorf("validation error: %s", e.msg)
}

// Is checks if the target error is a ValidationError
func (e *ValidationError) Is(target error) bool {
	if _, ok := target.(*ValidationError); ok {
		return true
	}
	return false
}
