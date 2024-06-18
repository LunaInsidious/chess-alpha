package authentication

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"chess-alpha/server/usecase/output_port"

	"chess-alpha/server/config"
)

var userTokenJwt = &hs256jwt{
	sigKey: []byte(config.SigKey()),
	createClaims: func() jwt.Claims {
		return &userClaims{}
	},
}

type userClaims struct {
	jwt.RegisteredClaims
	Scopes []string `json:"scopes"`
}

func IssueUserToken(userID string, issuedAt time.Time, scopes []string) (string, error) {
	id := uuid.New()

	// scopeによって有効期限を変更
	var expiredAt time.Time
	if contains(scopes, output_port.TokenScopeGeneral) {
		expiredAt = issuedAt.Add(output_port.TokenGeneralExpireDuration)
	} else if contains(scopes, output_port.TokenScopeUpdateEmail) {
		expiredAt = issuedAt.Add(output_port.TokenEmailUpdateExpireDuration)
	} else if contains(scopes, output_port.TokenScopeUpdatePassword) {
		expiredAt = issuedAt.Add(output_port.TokenChangePasswordExpireDuration)
	} else {
		return "", output_port.ErrUnknownScope
	}

	claims := &userClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			ID:        id.String(),
			Subject:   userID,
			IssuedAt:  jwt.NewNumericDate(issuedAt),
			ExpiresAt: jwt.NewNumericDate(expiredAt),
		},
		Scopes: scopes,
	}

	return userTokenJwt.issueToken(claims)
}

func VerifyUserToken(token string, scopes []string) (string, error) {
	claims, err := userTokenJwt.verifyToken(token)
	if err != nil {
		return "", err
	}

	// tokenのscopeが指定されたscopeを包含していない場合はエラー
	if !isInclusive(claims.(*userClaims).Scopes, scopes) {
		return "", output_port.ErrTokenScopeInvalid
	}

	return claims.(*userClaims).Subject, nil
}

// 配列a が 配列b を包含しているかどうかを返す
func isInclusive(a, b []string) bool {
	for _, v := range b {
		if !contains(a, v) {
			return false
		}
	}
	return true
}

func contains(s []string, e string) bool {
	for _, v := range s {
		if v == e {
			return true
		}
	}
	return false
}
