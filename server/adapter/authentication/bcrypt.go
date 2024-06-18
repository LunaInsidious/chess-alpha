package authentication

import (
	"encoding/base64"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrBase64DecodeFailed = errors.New("failed to decode in base64")
	ErrPasswordHashFailed = errors.New("failed to hash password")
	ErrUnexpected         = errors.New("unexpected error occurred in password comparing")
	ErrWrongPassword      = errors.New("password authentication failed")
)

func bcryptHash(txt string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(txt), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(hash), nil
}

func HashBcryptPassword(password string) (string, error) {
	hash, err := bcryptHash(password)
	if err != nil {
		return "", ErrPasswordHashFailed
	}

	return hash, nil
}

func CheckBcryptPassword(hashedPassword string, password string) error {
	hb, err := base64.StdEncoding.DecodeString(hashedPassword)
	if err != nil {
		return ErrBase64DecodeFailed
	}

	err = bcrypt.CompareHashAndPassword(hb, []byte(password))
	if err == nil {
		return nil
	}
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return ErrWrongPassword
	}
	return ErrUnexpected
}
