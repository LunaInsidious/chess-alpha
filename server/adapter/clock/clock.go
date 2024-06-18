package clock

import (
	"time"

	"chess-alpha/server/usecase/output_port"
)

type Clock struct{}

func New() output_port.Clock {
	return Clock{}
}

func (c Clock) Now() time.Time {
	return time.Now()
}
