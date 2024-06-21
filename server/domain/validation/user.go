package validation

import (
	"regexp"

	"chess-alpha/server/domain/entconst"
)

var (
	ErrTooLongEmail   = entconst.NewValidationError("email address is too long")
	ErrInvalidEmail   = entconst.NewValidationError("email address is invalid")
	ErrInvalidLoginID = entconst.NewValidationError("loginID is invalid")
)

func ValidateEmail(email string) error {
	if len(email) > 256 {
		return ErrTooLongEmail
	}

	const emailPattern string = `^[a-zA-Z0-9_+-.]+@[a-z0-9-.]+\.[a-z]+$`
	var emailRegexp *regexp.Regexp = regexp.MustCompile(emailPattern)
	if !emailRegexp.MatchString(email) {
		return ErrInvalidEmail
	}

	return nil
}

var (
	ErrTooShortPassword = entconst.NewValidationError("password is too short")
	ErrTooLongPassword  = entconst.NewValidationError("password is too long")
	ErrInvalidPassword  = entconst.NewValidationError("password is invalid")
)

func ValidatePassword(password string) error {
	if len(password) < 8 {
		return ErrTooShortPassword
	}

	if len(password) > 72 {
		return ErrTooLongPassword
	}

	const pattern string = `^[a-zA-Z0-9_+-.]+$`
	var passwordRegexp *regexp.Regexp = regexp.MustCompile(pattern)
	if !passwordRegexp.MatchString(password) {
		return ErrInvalidPassword
	}

	return nil
}

// ValidateLoginID LoginID must be 6digits number string
func ValidateLoginID(loginID string) error {
	const pattern string = `^[0-9]{8}$`
	var loginIDRegexp *regexp.Regexp = regexp.MustCompile(pattern)
	if !loginIDRegexp.MatchString(loginID) {
		return ErrInvalidLoginID
	}

	return nil
}
