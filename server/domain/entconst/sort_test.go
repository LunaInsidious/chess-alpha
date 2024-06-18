package entconst_test

import (
	"testing"

	"chess-alpha/server/domain/entconst"
)

func TestSortBy_String(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		sortBy   entconst.SortBy
		expected string
	}{
		{"none", entconst.SortByNone, ""},
		{"name", entconst.SortByName, "name"},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := tt.sortBy.String(); got != tt.expected {
				t.Errorf("SortBy.String() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestOrder_String(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		order    entconst.Order
		expected string
	}{
		{"asc", entconst.ASC, "asc"},
		{"desc", entconst.DESC, "desc"},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := tt.order.String(); got != tt.expected {
				t.Errorf("Order.String() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValidateOrder(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name      string
		order     string
		wantError bool
	}{
		{"valid asc order", "asc", false},
		{"valid desc order", "desc", false},
		{"invalid order", "invalid", true},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := entconst.ValidateOrder(tt.order)
			if (err != nil) != tt.wantError {
				t.Errorf("ValidateOrder() error = %v, wantError %v", err, tt.wantError)
			}
		})
	}
}
