package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/nickjmorrow/blog/models"
	"github.com/nickjmorrow/blog/queries"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name:   "RootQuery",
	Fields: queries.GetRootFields(),
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: rootQuery,
})

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

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	router.Handle("/graphql", h)

	handler := cors.Default().Handler(router)

	fmt.Println("Listening on port: ", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))

}
