package interactor

import (
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/output_port"
)

type HealthCheckUseCase struct {
	healthCheckRepo output_port.HealthCheckRepository
}

func NewHealthCheckUseCase(
	healthCheckRepo output_port.HealthCheckRepository,
) input_port.IHealthCheckUseCase {
	return &HealthCheckUseCase{
		healthCheckRepo: healthCheckRepo,
	}
}

func (u *HealthCheckUseCase) CheckHealthThroughAdapters() error {
	return u.healthCheckRepo.CheckDbConnection()
}

// ここでDBや外部APIからデータを取得して、整合性をチェックする
// 今はヘルスチェックと同じ実装になっている。実際はここはもっと複雑な処理が入る
func (u *HealthCheckUseCase) CheckDataConsistency() error {
	return u.healthCheckRepo.CheckDbConnection()
}
