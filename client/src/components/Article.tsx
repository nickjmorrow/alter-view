import * as React from 'react';
import { Article as ArticleType } from '../types';
import withRouter from 'react-router/withRouter';
import { RouterProps } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { getTitleFromPath } from '../utilities/getTitleFromPath';
import ReactHTMLParser from 'react-html-parser';

export const GatsbyQuery = graphql`
	{
		data {
			articles {
				articleId
				content
				tagline
				title
				dateCreated
			}
		}
	}
`;

const ArticleInternal: React.FC<RouterProps> = ({ location: { pathname } }) => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);
	const articleTitle = getTitleFromPath(pathname);
	const matchedArticle = articles.find(a => a.title.toLowerCase() === articleTitle);
	return (
		<div className="article">
			<h1>{matchedArticle.title}</h1>
			<h2>{matchedArticle.tagline}</h2>
			<div className="content">{ReactHTMLParser(matchedArticle.content)}</div>
		</div>
	);
};

export const Article = withRouter(ArticleInternal);
