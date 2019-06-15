package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/nickjmorrow/blog/models"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

type Animal struct {
	gorm.Model

	AnimalId int
	Name     string
}

type Article struct {
	gorm.Model

	ArticleId int
	Name      string
}

func (animal Animal) TableName() string {
	return "animals"
}

var db *gorm.DB

func main() {
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}
	router := mux.NewRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	db = models.GetDB()
	db.Exec("SET search_path TO dbo")

	db.AutoMigrate(&Animal{})

	router.HandleFunc("/animals", GetAnimals).Methods("GET")
	router.HandleFunc("/animals/{id}", GetAnimal).Methods("GET")
	router.HandleFunc("/animals", CreateResource).Methods("POST")
	router.HandleFunc("/animals/{id}", DeleteResource).Methods("DELETE")

	handler := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), handler))

}

func GetAnimals(w http.ResponseWriter, r *http.Request) {
	var animals []Animal
	db.Find(&animals)
	json.NewEncoder(w).Encode(&animals)
}

func GetAnimal(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var resource Animal
	db.First(&resource, params["Id"])
	json.NewEncoder(w).Encode(&resource)
}

func CreateResource(w http.ResponseWriter, r *http.Request) {
	var resource Animal
	json.NewDecoder(r.Body).Decode(&resource)
	db.Create(&resource)
	json.NewEncoder(w).Encode(&resource)
}

func DeleteResource(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var resource Animal
	db.First(&resource, params["Animal_Id"])
	db.Delete(&resource)

	var resources []Animal
	db.Find(&resources)
	json.NewEncoder(w).Encode(&resources)

}
