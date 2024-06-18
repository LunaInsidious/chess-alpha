package validation_test

import (
	"crypto/rand"
	"errors"
	"testing"

	"chess-alpha/server/domain/validation"
)

func TestValidatePhoneSuccess(t *testing.T) {
	t.Parallel()

	const p1 string = "09012345678"
	const p2 string = "0120123456"

	err := validation.ValidatePhoneNumber(p1)
	if err != nil {
		t.Errorf("Failed to test phone number validation: %v", err)
	}

	err = validation.ValidatePhoneNumber(p2)
	if err != nil {
		t.Errorf("Failed to test phone number validation: %v", err)
	}
}

func TestValidatePhoneFailed(t *testing.T) {
	t.Parallel()

	const p1 string = "10011112222"
	const p2 string = "01022222223333"

	err := validation.ValidatePhoneNumber(p1)
	if !errors.Is(err, validation.ErrInvalidPhoneNumber) {
		t.Errorf("Failed to test phone number validation: %v", err)
	}

	err = validation.ValidatePhoneNumber(p2)
	if !errors.Is(err, validation.ErrInvalidPhoneNumberLength) {
		t.Errorf("Failed to test phone number validation: %v", err)
	}
}

// test用に任意の長さの文字列の生成
func makeRandomStr(digit int32) (string, error) {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	b := make([]byte, digit)
	if _, err := rand.Read(b); err != nil {
		return "", errors.New("unexpected error ...")
	}

	var result string
	for _, v := range b {
		result += string(letters[int(v)%len(letters)])
	}

	return result, nil
}

func TestValidateCharacterLimit(t *testing.T) {
	t.Parallel()

	testCharacter255, _ := makeRandomStr(255)
	testCharacter30, _ := makeRandomStr(30)
	testCharacter256, _ := makeRandomStr(256)

	// 文字列長255のテスト
	err := validation.ValidateCharacterLimit(testCharacter255)
	if err != nil {
		t.Errorf("Failed to test character limit validation: %v", err)
	}

	// 文字列長255より小さい場合のテスト
	err = validation.ValidateCharacterLimit(testCharacter30)
	if err != nil {
		t.Errorf("Failed to test character limit validation: %v", err)
	}

	// 文字列長255より大きい場合の失敗テスト
	err = validation.ValidateCharacterLimit(testCharacter256)
	if !errors.Is(err, validation.ErrInvalidCharacterLimit) {
		t.Errorf("Failed to test character limit validation: %v", err)
	}

	// 文字列長が指定文字列長より大きい場合のテスト
	err = validation.ValidateCharacterLimit(testCharacter30, validation.Limit(29))
	if !errors.Is(err, validation.ErrInvalidCharacterLimit) {
		t.Errorf("Failed to test character limit validation: %v", err)
	}
}

func TestValidateCharacterLength(t *testing.T) {
	t.Parallel()

	testCharacter10, _ := makeRandomStr(10)
	testZeroValue := ""

	err := validation.ValidateCharacterLength(testCharacter10, 10)
	if err != nil {
		t.Errorf("Failed to test character length validation: %v", err)
	}

	err = validation.ValidateCharacterLength(testCharacter10, 20)
	if !errors.Is(err, validation.ErrInvalidCharacterLength) {
		t.Errorf("Failed to test character length validation: %v", err)
	}

	// ゼロ値の場合は固定長のvalidateをしないテスト
	err = validation.ValidateCharacterLength(testZeroValue, 10)
	if err != nil {
		t.Errorf("Failed to test character length validation: %v", err)
	}
}
