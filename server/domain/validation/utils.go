package validation

import (
	"regexp"
	"unicode/utf8"

	"chess-alpha/server/domain/entconst"
)

var (
	ErrInvalidPhoneNumberLength = entconst.NewValidationErrorFromMsg("invalid phone number length")
	ErrInvalidPhoneNumber       = entconst.NewValidationErrorFromMsg("invalid phone number")
	ErrInvalidCharacterLimit    = entconst.NewValidationErrorFromMsg("invalid character limit")
	ErrInvalidCharacterLength   = entconst.NewValidationErrorFromMsg("invalid character length")
)

func ValidatePhoneNumber(phone string) error {
	pLength := len(phone)
	if pLength != 10 && pLength != 11 {
		return ErrInvalidPhoneNumberLength
	}

	const pattern = `^0\d{9,10}$`
	var phoneRegexp *regexp.Regexp = regexp.MustCompile(pattern)
	if !phoneRegexp.MatchString(phone) {
		return ErrInvalidPhoneNumber
	}

	return nil
}

type LimitOptions struct {
	limit int
}

type LimitOption func(*LimitOptions)

func Limit(arg1 int) LimitOption {
	return func(opts *LimitOptions) {
		opts.limit = arg1
	}
}

func ValidateCharacterLimit(s string, options ...LimitOption) error {
	// defaultの文字数は255
	opts := &LimitOptions{
		limit: 255,
	}

	for _, option := range options {
		option(opts)
	}

	if utf8.RuneCountInString(s) > opts.limit {
		return ErrInvalidCharacterLimit
	}

	return nil
}

func ValidateCharacterLength(s string, length int) error {
	if s != "" && utf8.RuneCountInString(s) != length {
		return ErrInvalidCharacterLength
	}

	return nil
}
