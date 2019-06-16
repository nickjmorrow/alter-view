package types

import (
	"github.com/graphql-go/graphql"
)

type Article struct {
	ArticleId   int    `db:"article_id" json:"articleId"`
	Title       string `db:"title" json:"title"`
	Tagline     string `db:"tagline" json:"tagline"`
	Content     string `db:"content" json:"content"`
	DateCreated string `db:"date_created" json:"dateCreated"`
	DateDeleted string `db:"date_deleted" json:"dateDeleted"`
}

var ArticleType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Article",
	Fields: graphql.Fields{
		"articleId":   &graphql.Field{Type: graphql.Int},
		"title":       &graphql.Field{Type: graphql.String},
		"tagline":     &graphql.Field{Type: graphql.String},
		"content":     &graphql.Field{Type: graphql.String},
		"dateCreated": &graphql.Field{Type: graphql.String},
		"dateDeleted": &graphql.Field{Type: graphql.String},
	},
})
