package models

import (
	"gorm.io/gorm"
)

type Person struct {
	ID   int
	Name string
}

type Car struct {
	gorm.Model
	ID       int
	Make     string
	Color    string
	Year     int64
	PersonID int
	Person   Person
	Image    []byte
}
