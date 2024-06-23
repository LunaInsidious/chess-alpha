package database

import (
	"errors"

	"gorm.io/gorm"

	"chess-alpha/server/usecase/interactor"

	"chess-alpha/server/adapter/database/model"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/output_port"
)

type UserRepository struct {
	db   *gorm.DB
	ulid output_port.ULID
}

func NewUserRepository(
	db *gorm.DB,
	ulid output_port.ULID,
) output_port.UserRepository {
	return &UserRepository{db: db, ulid: ulid}
}

func (r *UserRepository) FindByLoginID(loginID string) (_ entity.User, err error) {
	defer output_port.WrapDatabaseError(&err)
	ret := &model.User{}
	err = r.db.Where("login_id = ?", loginID).First(ret).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return entity.User{}, interactor.NewNotFoundError("loginID", loginID)
	}
	if err != nil {
		return entity.User{}, err
	}
	return ret.Entity(), nil
}

func (r *UserRepository) FindByID(userID string) (_ entity.User, err error) {
	defer output_port.WrapDatabaseError(&err)
	res := model.User{}
	err = r.db.
		Where("user_id = ?", userID).
		First(&res).
		Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return entity.User{}, interactor.NewNotFoundError("userID", userID)
	}
	if err != nil {
		return entity.User{}, err
	}
	return res.Entity(), nil
}

func (r *UserRepository) UpdateRate(userID string, rate int) (err error) {
	defer output_port.WrapDatabaseError(&err)
	return r.db.
		Where("user_id = ?", userID).
		Updates(&model.User{
			Rate: rate,
		}).Error
}
