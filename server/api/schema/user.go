package schema

import "chess-alpha/server/domain/entity"

type UserRes struct {
	UserID  string `json:"userId"`
	LoginID string `json:"loginId"`
	Name    string `json:"name"`
	Rate    int    `json:"rate"`
}

type UsersRes struct {
	List  []UserRes `json:"list"`
	Total int       `json:"total"`
}

type CreateUserReq struct {
	LoginID  string `json:"loginId"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

func UserResFromEntity(user entity.User) UserRes {
	return UserRes{
		UserID:  user.UserID,
		LoginID: user.LoginID,
		Name:    user.Name,
		Rate:    user.Rate,
	}
}

func UsersResFromSearchResult(list []entity.User, total int) UsersRes {
	users := make([]UserRes, len(list))
	for i, user := range list {
		users[i] = UserResFromEntity(user)
	}
	return UsersRes{
		List:  users,
		Total: total,
	}
}
