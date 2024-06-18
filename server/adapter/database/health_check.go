package database

import (
	"gorm.io/gorm"

	"chess-alpha/server/usecase/output_port"
)

type HealthCheckRepository struct {
	db *gorm.DB
}

func NewHealthCheckRepository(
	db *gorm.DB,
) output_port.HealthCheckRepository {
	return &HealthCheckRepository{db: db}
}

func (r *HealthCheckRepository) CheckDbConnection() (err error) {
	defer output_port.WrapDatabaseError(&err)
	var result int
	return r.db.Raw("SELECT 1").Scan(&result).Error
}
