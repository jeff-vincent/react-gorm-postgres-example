package main

import (
	"fmt"
	"log"
	"strconv"

	"gorm-postgres-example/db"
	"gorm-postgres-example/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func createCar(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		make := ctx.PostForm("make")
		color := ctx.PostForm("color")
		year := ctx.PostForm("year")
		ownerID := ctx.PostForm("owner_id")
		i, err := strconv.ParseInt(year, 10, 64)
		if err != nil {
			log.Printf("Failed to parse year: %v", err)
		}
		oi, err := strconv.Atoi(ownerID)
		if err != nil {
			log.Printf("Failed to convert owner ID: %v", err)
		}

		c := models.Car{Make: make, Color: color, Year: i, PersonID: oi}
		db.Create(&c)

		ctx.JSON(201, gin.H{
			"make":      c.Make,
			"color":     c.Color,
			"year":      c.Year,
			"id":        c.ID,
			"person":    c.Person,
			"person_id": c.PersonID,
		})
	}
}

func getCarByID(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		car := models.Car{}
		id := ctx.Param("id")
		result := db.Preload("Person").First(&car, id)
		if result.Error != nil {
			log.Printf("Failed to get car by ID: %v", result.Error)
			ctx.JSON(500, gin.H{
				"error": "Failed to get car by ID",
			})
			return
		}
		fmt.Println(car.Person.Name)
		ctx.JSON(200, gin.H{
			"make":      &car.Make,
			"color":     &car.Color,
			"year":      &car.Year,
			"id":        &car.ID,
			"person":    &car.Person,
			"person_id": &car.PersonID,
		})
	}
}

func createPerson(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		name := ctx.PostForm("name")
		formMap := ctx.Request.PostForm

		// Iterate over the map of form values
		for key, values := range formMap {
			fmt.Printf("Key: %s\n", key)
			for _, value := range values {
				fmt.Printf("Value: %s\n", value)
			}
		}
		p := models.Person{Name: name}
		result := db.Create(&p)
		if result.Error != nil {
			log.Printf("Failed to create person: %v", result.Error)
			ctx.JSON(500, gin.H{
				"error": "Failed to create person",
			})
			return
		}
		ctx.JSON(201, gin.H{
			"name": p.Name,
			"id":   p.ID,
		})
	}
}

func getPersonByID(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		p := models.Person{}
		id := ctx.Param("id")
		result := db.First(&p, id)
		if result.Error != nil {
			log.Printf("Failed to get person by ID: %v", result.Error)
			ctx.JSON(500, gin.H{
				"error": "Failed to get person by ID",
			})
			return
		}
		ctx.JSON(200, gin.H{
			"name": p.Name,
			"id":   p.ID,
		})
	}
}

func main() {
	r := gin.Default()
	db := db.InitDB()

	r.Use(cors.Default())

	r.POST("/car", createCar(db))
	r.GET("/car/:id", getCarByID(db))
	r.POST("/person", createPerson(db))
	r.GET("/person/:id", getPersonByID(db))

	if err := r.Run(); err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}
}
