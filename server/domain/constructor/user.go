package constructor

import (
	"errors"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/domain/validation"
)

type NewUserArgs struct {
	UserID         string
	LoginID        string
	Name           string
	Rate           int
	Password       string
	HashedPassword string
}

func NewUser(args NewUserArgs) (entity.User, error) {
	errs := make([]error, 0, 10)

	if args.UserID == "" {
		errs = append(errs, entconst.NewValidationError("userID is required."))
	}

	if err := validation.ValidateLoginID(args.LoginID); err != nil {
		errs = append(errs, err)
	}

	if args.Name == "" {
		errs = append(errs, entconst.NewValidationError("name is required."))
	}

	if args.HashedPassword == "" {
		errs = append(errs, entconst.NewValidationError("password is not hashed."))
	}

	if err := validation.ValidatePassword(args.Password); err != nil {
		errs = append(errs, err)
	}

	if len(errs) > 0 {
		return entity.User{}, errors.Join(errs...)
	}

	return entity.User{
		UserID:         args.UserID,
		LoginID:        args.LoginID,
		Name:           args.Name,
		Rate:           args.Rate,
		HashedPassword: args.HashedPassword,
	}, nil
}
