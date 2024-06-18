package initdata

import (
	"chess-alpha/server/adapter/authentication"
	"chess-alpha/server/adapter/database/model"
)

// User returns []*model.User（例）
// このように、固定のマスタデータなどは初期投入データを関数で定義しておくと、jsonより楽な場合が多い
func User() []*model.User {
	hp, _ := authentication.HashBcryptPassword("password")
	return []*model.User{
		{
			UserID:         "test-1",
			LoginID:        "00000000",
			Name:           "testUser1",
			Rate:           1000,
			HashedPassword: hp,
		},
	}
}
