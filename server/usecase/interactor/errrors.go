package interactor

import (
	"fmt"
)

type NotFoundError struct {
	target  string
	request string
}

type ConflictError struct {
	target  string
	request string
}

type ForbiddenError struct {
	userAuth     string
	requiredAuth string
}

type BadRequestError struct {
	msg string
}

func NewNotFoundError(target, request string) *NotFoundError {
	return &NotFoundError{target: target, request: request}
}

func NewConflictError(target, request string) *ConflictError {
	return &ConflictError{target: target, request: request}
}

func NewForbiddenError(requiredAuth, userAuth string) *ForbiddenError {
	return &ForbiddenError{requiredAuth: requiredAuth, userAuth: userAuth}
}

func NewBadRequestError(msg string) *BadRequestError {
	return &BadRequestError{msg: msg}
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("not found error: %s: %s is not found", e.target, e.request)
}

func (e *NotFoundError) Unwrap() error {
	return fmt.Errorf("not found error: %s: %s is not found", e.target, e.request)
}

func (e *NotFoundError) Is(target error) bool {
	if _, ok := target.(*NotFoundError); ok {
		return true
	}
	return false
}

func (e *ConflictError) Error() string {
	return fmt.Sprintf("conflict error: %s: %s is already exist", e.target, e.request)
}

func (e *ConflictError) Unwrap() error {
	return fmt.Errorf("conflict error: %s: %s is already exist", e.target, e.request)
}

func (e *ConflictError) Is(target error) bool {
	if _, ok := target.(*ConflictError); ok {
		return true
	}
	return false
}

func (e *ForbiddenError) Error() string {
	return fmt.Sprintf("forbidden error: required permission: %s.your current permission: %s", e.requiredAuth, e.userAuth)
}

func (e *ForbiddenError) Unwrap() error {
	return fmt.Errorf("forbidden error: required permission: %s.your current permission: %s", e.requiredAuth, e.userAuth)
}

func (e *ForbiddenError) Is(target error) bool {
	if _, ok := target.(*ForbiddenError); ok {
		return true
	}
	return false
}

func (e *BadRequestError) Error() string {
	return fmt.Sprintf("bad request error: %s", e.msg)
}

func (e *BadRequestError) Unwrap() error {
	return fmt.Errorf("bad request error: %s", e.msg)
}

func (e *BadRequestError) Is(target error) bool {
	if _, ok := target.(*BadRequestError); ok {
		return true
	}
	return false
}
