package interactor_test

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"

	"chess-alpha/server/usecase/interactor"
	mock_output_port "chess-alpha/server/usecase/output_port_mock"
)

func TestHealthCheckUseCase_CheckHealthThroughAdapters(t *testing.T) {
	t.Parallel()

	ctrl := gomock.NewController(t)
	t.Cleanup(ctrl.Finish)

	mockRepo := mock_output_port.NewMockHealthCheckRepository(ctrl)
	useCase := interactor.NewHealthCheckUseCase(mockRepo)

	//正常パターンでモックを呼び出すだけのtest
	tests := []struct {
		name      string
		setupMock func()
		wantErr   error
	}{
		{
			name: "success",
			setupMock: func() {
				mockRepo.EXPECT().CheckDbConnection().Return(nil)
			},
			wantErr: nil,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			tt.setupMock()

			err := useCase.CheckHealthThroughAdapters()
			if !errors.Is(err, tt.wantErr) {
				t.Errorf("CheckHealthThroughAdapters() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestHealthCheckUseCase_CheckDataConsistency(t *testing.T) {
	t.Parallel()

	ctrl := gomock.NewController(t)
	t.Cleanup(ctrl.Finish)

	mockRepo := mock_output_port.NewMockHealthCheckRepository(ctrl)
	useCase := interactor.NewHealthCheckUseCase(mockRepo)

	//正常パターンでモックを呼び出すだけのtest
	tests := []struct {
		name      string
		setupMock func()
		wantErr   error
	}{
		{
			name: "success",
			setupMock: func() {
				mockRepo.EXPECT().CheckDbConnection().Return(nil)
			},
			wantErr: nil,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			tt.setupMock()

			err := useCase.CheckDataConsistency()
			if !errors.Is(err, tt.wantErr) {
				t.Errorf("CheckDataConsistency() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
