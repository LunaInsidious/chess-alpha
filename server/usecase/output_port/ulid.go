package output_port

type ULID interface {
	GenerateID() string
}
