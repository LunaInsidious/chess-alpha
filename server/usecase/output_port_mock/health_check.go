// Code generated by MockGen. DO NOT EDIT.
// Source: ./usecase/output_port/health_check.go

// Package mock_output_port is a generated GoMock package.
package mock_output_port

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockHealthCheckRepository is a mock of HealthCheckRepository interface.
type MockHealthCheckRepository struct {
	ctrl     *gomock.Controller
	recorder *MockHealthCheckRepositoryMockRecorder
}

// MockHealthCheckRepositoryMockRecorder is the mock recorder for MockHealthCheckRepository.
type MockHealthCheckRepositoryMockRecorder struct {
	mock *MockHealthCheckRepository
}

// NewMockHealthCheckRepository creates a new mock instance.
func NewMockHealthCheckRepository(ctrl *gomock.Controller) *MockHealthCheckRepository {
	mock := &MockHealthCheckRepository{ctrl: ctrl}
	mock.recorder = &MockHealthCheckRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockHealthCheckRepository) EXPECT() *MockHealthCheckRepositoryMockRecorder {
	return m.recorder
}

// CheckDbConnection mocks base method.
func (m *MockHealthCheckRepository) CheckDbConnection() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckDbConnection")
	ret0, _ := ret[0].(error)
	return ret0
}

// CheckDbConnection indicates an expected call of CheckDbConnection.
func (mr *MockHealthCheckRepositoryMockRecorder) CheckDbConnection() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckDbConnection", reflect.TypeOf((*MockHealthCheckRepository)(nil).CheckDbConnection))
}
