package input_port

type IHealthCheckUseCase interface {
	// DBに限らず、アプリケーションを通じてヘルスチェックを行うのに用いる
	CheckHealthThroughAdapters() error
	// DBや外部APIの整合性をチェックするのに用いる
	CheckDataConsistency() error
}
