package constructor_test

import (
	"testing"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/validation"
	"chess-alpha/server/testutil"

	"github.com/google/go-cmp/cmp"

	"chess-alpha/server/domain/constructor"
)

func TestNewUser(t *testing.T) {
	t.Parallel()
	successArgs := constructor.NewUserArgs{
		UserID:         "testUserId1",
		LoginID:        "00000000",
		Name:           "test",
		Rate:           1000,
		Password:       "password",
		HashedPassword: "hashedPassword",
	}

	tests := []struct {
		name          string
		modify        func(args *constructor.NewUserArgs)
		expectedError error
	}{
		{
			name:          "success",
			modify:        func(args *constructor.NewUserArgs) {},
			expectedError: nil,
		},
		{
			name: "Empty UserID",
			modify: func(args *constructor.NewUserArgs) {
				args.UserID = ""
			},
			expectedError: entconst.NewValidationError("userID is required."),
		},
		{
			name: "Invalid loginID",
			modify: func(args *constructor.NewUserArgs) {
				args.LoginID = "test1234"
			},
			expectedError: validation.ErrInvalidLoginID,
		},
		{
			name: "Too long password",
			modify: func(args *constructor.NewUserArgs) {
				args.Password = testutil.RandStrEn(73)
			},
			expectedError: validation.ErrTooLongPassword,
		},
		{
			name: "Too short password",
			modify: func(args *constructor.NewUserArgs) {
				args.Password = testutil.RandStrEn(7)
			},
			expectedError: validation.ErrTooShortPassword,
		},
		{
			name: "Empty name",
			modify: func(args *constructor.NewUserArgs) {
				args.Name = ""
			},
			expectedError: entconst.NewValidationError("name is required."),
		},
		{
			name: "Empty hashed password",
			modify: func(args *constructor.NewUserArgs) {
				args.HashedPassword = ""
			},
			expectedError: entconst.NewValidationError("password is not hashed."),
		},
		{
			name: "Invalid password",
			modify: func(args *constructor.NewUserArgs) {
				args.Password = testutil.RandStr(8)
			},
			expectedError: validation.ErrInvalidPassword,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			args := successArgs
			tt.modify(&args)
			_, err := constructor.NewUser(args)
			if err == nil {
				if tt.expectedError != nil {
					t.Errorf("expected error but got none")
				}
				return
			}
			if diff := cmp.Diff(err.Error(), tt.expectedError.Error()); diff != "" {
				t.Errorf("NewUpdatePassword() error mismatch (-want +got):\n%s", diff)
			}
		})
	}
}
