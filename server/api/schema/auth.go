package schema

const TokenType = "Bearer"

type LoginReq struct {
	LoginID  string `json:"loginId"`
	Password string `json:"password"`
}

type LoginResUser struct {
	UserId  string `json:"userId"`
	LoginID string `json:"loginId"`
}

type LoginRes struct {
	AccessToken string       `json:"accessToken"`
	TokenType   string       `json:"tokenType"`
	User        LoginResUser `json:"user"`
}
