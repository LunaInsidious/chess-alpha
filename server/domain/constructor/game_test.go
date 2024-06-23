package constructor_test

import (
	"testing"
	"time"

	"chess-alpha/server/domain/entconst"

	"github.com/google/go-cmp/cmp"

	"chess-alpha/server/domain/constructor"
)

func TestNewGame(t *testing.T) {
	t.Parallel()
	successArgs := constructor.NewGameArgs{
		GameID:     "testID",
		CitizenIDs: []string{"test1", "test2"},
		WerewolfID: "test3",
		GameRecord: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
		Result:     "",
		StartAt:    time.Date(2024, 0, 1, 0, 0, 0, 0, time.Local),
		EndAt:      nil,
	}

	tests := []struct {
		name          string
		modify        func(args *constructor.NewGameArgs)
		expectedError error
	}{
		{
			name:          "success",
			modify:        func(args *constructor.NewGameArgs) {},
			expectedError: nil,
		},
		{
			name: "Empty GameID",
			modify: func(args *constructor.NewGameArgs) {
				args.GameID = ""
			},
			expectedError: entconst.NewValidationErrorFromMsg("gameID is required"),
		},
		{
			name: "Empty CitizenID",
			modify: func(args *constructor.NewGameArgs) {
				args.CitizenIDs = []string{"test1", "test2", ""}
			},
			expectedError: entconst.NewValidationErrorFromMsg("citizenID is required in index 2"),
		},
		{
			name: "too little CitizenID",
			modify: func(args *constructor.NewGameArgs) {
				args.CitizenIDs = []string{"test1"}
			},
			expectedError: entconst.NewValidationErrorFromMsg("citizen must be at least 2 and no more than 5"),
		},
		{
			name: "too many CitizenID",
			modify: func(args *constructor.NewGameArgs) {
				args.CitizenIDs = []string{"test1", "test2", "test3", "test4", "test5", "test6"}
			},
			expectedError: entconst.NewValidationErrorFromMsg("citizen must be at least 2 and no more than 5"),
		},
		{
			name: "Empty WerewolfID",
			modify: func(args *constructor.NewGameArgs) {
				args.WerewolfID = ""
			},
			expectedError: entconst.NewValidationErrorFromMsg("werewolfID is required"),
		},
		{
			name: "Empty GameRecord",
			modify: func(args *constructor.NewGameArgs) {
				args.GameRecord = ""
			},
			expectedError: entconst.NewValidationErrorFromMsg("gameRecord is required"),
		},
		{
			name: "Empty StartAt",
			modify: func(args *constructor.NewGameArgs) {
				args.StartAt = time.Time{}
			},
			expectedError: entconst.NewValidationErrorFromMsg("startAt is required"),
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			args := successArgs
			tt.modify(&args)
			_, err := constructor.NewGame(args)
			if err == nil {
				if tt.expectedError != nil {
					t.Errorf("expected error but got none")
				}
				return
			}
			if diff := cmp.Diff(err.Error(), tt.expectedError.Error()); diff != "" {
				t.Errorf("NewGame() error mismatch (-want +got):\n%s", diff)
			}
		})
	}
}
