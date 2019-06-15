package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/nickjmorrow/blog/models"
	"github.com/rs/cors"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type Animal struct {
	gorm.Model

	AnimalId int
	Name     string
}

func (animal Animal) TableName() string {
	return "animals"
}

type Article struct {
	gorm.Model

	ArticleId int
	Name      string
}

type Todo struct {
	gorm.Model
	TodoId string `json:"id"`
	Text   string `json:"text"`
	Done   bool   `json:"done"`
}

func (todo Todo) TableName() string {
	return "todos"
}

var TodoList []Todo

func init() {
	todo1 := Todo{TodoId: "a", Text: "A todo not to forget", Done: false}
	todo2 := Todo{TodoId: "b", Text: "This is the most important", Done: false}
	todo3 := Todo{TodoId: "c", Text: "Please do this or else", Done: false}
	TodoList = append(TodoList, todo1, todo2, todo3)

	rand.Seed(time.Now().UnixNano())
}

var todoType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Todo",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"text": &graphql.Field{
			Type: graphql.String,
		},
		"done": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"todoList": &graphql.Field{
			Type:        graphql.NewList(todoType),
			Description: "List of todos",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// return TodoList, nil
				var todoList []Todo
				db.Find(&todoList)
				// json.NewEncoder(w).Encode(&todoList)
				return todoList, nil
			},
		},
	},
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: rootQuery,
})

func executeQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		fmt.Printf("Wrong result, unexpected errors: %v", result.Errors)
	}
	return result
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

	db.AutoMigrate(&Todo{})
	db.AutoMigrate(&Animal{})

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	router.HandleFunc("/animals", GetAnimals).Methods("GET")
	router.HandleFunc("/animals/{id}", GetAnimal).Methods("GET")
	router.HandleFunc("/animals", CreateResource).Methods("POST")
	router.HandleFunc("/animals/{id}", DeleteResource).Methods("DELETE")
	router.Handle("/graphql", h)

	handler := cors.Default().Handler(router)

	fmt.Println("Listening on ", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))

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
