package output_port

type HealthCheckRepository interface {
	CheckDbConnection() error
}
