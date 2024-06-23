package entconst

import (
	"errors"
	"fmt"
)

// ValidationError is a custom error type
type ValidationError struct {
	inner error
}

// NewValidationError a new ValidationError with a custom message
func NewValidationError(err error) *ValidationError {
	return &ValidationError{inner: err}
}

// NewValidationErrorFromMsg a new ValidationError from a string message
func NewValidationErrorFromMsg(msg string) *ValidationError {
	return &ValidationError{inner: errors.New(msg)}
}

// Error returns the error message for ValidationError
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error: %s", e.inner.Error())
}

// Unwrap returns the error message for ValidationError
func (e *ValidationError) Unwrap() error {
	return e.inner
}

// Is checks if the target error is a ValidationError
func (e *ValidationError) Is(target error) bool {
	_, ok := target.(*ValidationError)
	return ok
}

// NotFoundError is a custom error type
type NotFoundError struct {
	inner error
}

// NewNotFoundError a new NotReturnError with a custom message
func NewNotFoundError(err error) error { // 返り値の型をNotFoundErrorにするとerrors.As()で判定できなくなる。
	return &NotFoundError{inner: err}
}

// NewNotFoundErrorFromMsg a new NotReturnError from a string message
func NewNotFoundErrorFromMsg(msg string) error {
	return &NotFoundError{inner: errors.New(msg)}
}

// Error returns the error message for NotFoundError
func (e *NotFoundError) Error() string {
	return fmt.Sprintf("notfound error: %s", e.inner.Error())
}

// Unwrap returns the error message for NotFoundError
func (e *NotFoundError) Unwrap() error {
	return e.inner
}

// Is checks if the target error is a NotFoundError
func (e *NotFoundError) Is(target error) bool {
	_, ok := target.(*NotFoundError)
	return ok
}

// ConflictError is a custom error type
type ConflictError struct {
	inner error
}

// NewConflictError a new ConflictError with a custom message
func NewConflictError(err error) *ConflictError {
	return &ConflictError{inner: err}
}

// NewConflictErrorFromMsg a new ConflictError from a string message
func NewConflictErrorFromMsg(msg string) *ConflictError {
	return &ConflictError{inner: errors.New(msg)}
}

// Error returns the error message for ConflictError
func (e *ConflictError) Error() string {
	return fmt.Sprintf("conflict error: %s", e.inner.Error())
}

// Unwrap returns the error message for ConflictError
func (e *ConflictError) Unwrap() error {
	return e.inner
}

// Is checks if the target error is a ConflictError
func (e *ConflictError) Is(target error) bool {
	_, ok := target.(*ConflictError)
	return ok
}

// ForbiddenError is a custom error type
type ForbiddenError struct {
	inner error
}

// NewForbiddenError a new ForbiddenError with a custom message
func NewForbiddenError(requiredAuth, userAuth string) *ForbiddenError {
	err := fmt.Errorf("required permission: %s.your current permission: %s", requiredAuth, userAuth)
	return &ForbiddenError{inner: err}
}

// NewForbiddenErrorFromMsg a new ForbiddenError from a string message
func NewForbiddenErrorFromMsg(msg string) *ForbiddenError {
	return &ForbiddenError{inner: errors.New(msg)}
}

// Error returns the error message for ForbiddenError
func (e *ForbiddenError) Error() string {
	return fmt.Sprintf("forbidden error: %s", e.inner.Error())
}

// Unwrap returns the error message for ForbiddenError
func (e *ForbiddenError) Unwrap() error {
	return e.inner
}

// Is checks if the target error is a ForbiddenError
func (e *ForbiddenError) Is(target error) bool {
	_, ok := target.(*ForbiddenError)
	return ok
}

// DatabaseError is a custom error type
type DatabaseError struct {
	inner error
}

// NewDatabaseError a new DatabaseError with a custom message
func NewDatabaseError(err error) error {
	return &DatabaseError{inner: err}
}

// NewDatabaseErrorFromMsg a new DatabaseError from a string message
func NewDatabaseErrorFromMsg(msg string) error {
	return &DatabaseError{inner: errors.New(msg)}
}

// Error returns the error message for DatabaseError
func (e *DatabaseError) Error() string {
	return fmt.Sprintf("database error: %s", e.inner.Error())
}

// Unwrap returns the error message for DatabaseError
func (e *DatabaseError) Unwrap() error {
	return e.inner
}

// WrapDatabaseError wraps DatabaseError
func WrapDatabaseError(err *error) {
	if *err != nil {
		e := NewDatabaseError(*err)
		*err = e
	}
}

type UnauthorizedError struct {
	inner error
}

func NewUnauthorizedError(err error) error { return &UnauthorizedError{inner: err} }
func NewUnauthorizedErrorFromMsg(msg string) error {
	return &UnauthorizedError{inner: errors.New(msg)}
}
func (e *UnauthorizedError) Unwrap() error { return e.inner }
func (e *UnauthorizedError) Error() string {
	return fmt.Sprintf("unauthorized error: %s", e.inner.Error())
}

type HasNoPermissionError struct{ inner error }

func NewHasNoPermissionError(err error) error { return &HasNoPermissionError{inner: err} }
func NewHasNoPermissionErrorFromMsg(msg string) error {
	return &HasNoPermissionError{inner: errors.New(msg)}
}
func (e *HasNoPermissionError) Unwrap() error { return e.inner }
func (e *HasNoPermissionError) Error() string {
	return fmt.Sprintf("has no permission error: %s", e.inner.Error())
}
