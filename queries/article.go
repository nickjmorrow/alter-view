package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/nickjmorrow/blog/models"
	"github.com/nickjmorrow/blog/types"
	"log"
)

func GetArticlesQuery() *graphql.Field {
	db := models.GetDB()
	return &graphql.Field{
		Type: graphql.NewList(types.ArticleType),
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			log.Printf("[query] articles\n")
			var articles []types.Article
			db.Find(&articles)
			return articles, nil
		},
	}
}
