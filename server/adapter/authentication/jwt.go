package authentication

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

type hs256jwt struct {
	sigKey       []byte
	createClaims func() jwt.Claims
}

func (t *hs256jwt) issueToken(claims jwt.Claims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(t.sigKey)
}

func (t *hs256jwt) verifyToken(tokenStr string) (jwt.Claims, error) {
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return t.sigKey, nil
	}

	token, err := jwt.ParseWithClaims(tokenStr, t.createClaims(), keyFunc)
	if err != nil {
		return nil, fmt.Errorf("failed to verify JWT: %w", err)
	}

	return token.Claims, nil
}
