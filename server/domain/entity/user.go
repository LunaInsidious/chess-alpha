package entity

type User struct {
	UserID         string
	LoginID        string
	Name           string
	Rate           int
	HashedPassword string // useCase内でHashedPasswordを生成し、設定する
}
