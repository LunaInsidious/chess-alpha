package output_port

import (
	"fmt"
)

type DatabaseError struct {
	inner error
}

func NewDatabaseError(inner error) error { return &DatabaseError{inner: inner} }
func (e *DatabaseError) Unwrap() error   { return e.inner }
func (e *DatabaseError) Error() string   { return fmt.Sprintf("database error: %s", e.inner.Error()) }

func WrapDatabaseError(err *error) {
	if *err != nil {
		e := NewDatabaseError(*err)
		*err = e
	}
}
