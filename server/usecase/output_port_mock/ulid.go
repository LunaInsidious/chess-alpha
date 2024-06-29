// Code generated by MockGen. DO NOT EDIT.
// Source: ./usecase/output_port/ulid.go

// Package mock_output_port is a generated GoMock package.
package mock_output_port

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockULID is a mock of ULID interface.
type MockULID struct {
	ctrl     *gomock.Controller
	recorder *MockULIDMockRecorder
}

// MockULIDMockRecorder is the mock recorder for MockULID.
type MockULIDMockRecorder struct {
	mock *MockULID
}

// NewMockULID creates a new mock instance.
func NewMockULID(ctrl *gomock.Controller) *MockULID {
	mock := &MockULID{ctrl: ctrl}
	mock.recorder = &MockULIDMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockULID) EXPECT() *MockULIDMockRecorder {
	return m.recorder
}

// GenerateID mocks base method.
func (m *MockULID) GenerateID() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GenerateID")
	ret0, _ := ret[0].(string)
	return ret0
}

// GenerateID indicates an expected call of GenerateID.
func (mr *MockULIDMockRecorder) GenerateID() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GenerateID", reflect.TypeOf((*MockULID)(nil).GenerateID))
}