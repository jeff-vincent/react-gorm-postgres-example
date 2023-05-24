package db

import (
	"gorm-postgres-example/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	connStr := "postgresql://postgres:postgres@localhost:5432/example_db?sslmode=disable"
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	Car := models.Car{}
	Person := models.Person{}
	db.AutoMigrate(&Car, &Person)
	return db
}
