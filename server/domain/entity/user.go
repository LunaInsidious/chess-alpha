package entity

type User struct {
	UserID         string
	LoginID        string
	Name           string
	Rate           int
	Color          string
	HashedPassword string // useCase内でHashedPasswordを生成し、設定する
}
