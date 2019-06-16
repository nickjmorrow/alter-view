import { Location } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import ReactHTMLParser from 'react-html-parser';
import { Article as ArticleType } from '../types';
import { getTitleFromPath } from '../utilities/getTitleFromPath';

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

const ArticleInternal: React.FC<{ path: string }> = ({ path }) => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);

	return (
		<Location>
			{props => {
				const { location } = props;
				const articleTitle = getTitleFromPath(location.pathname);
				console.log(articleTitle);
				const matchedArticle = articles.find(a => a.title.toLowerCase() === articleTitle);
				return (
					<div className="article">
						<h1>{matchedArticle.title}</h1>
						<h2>{matchedArticle.tagline}</h2>
						<div className="content">{ReactHTMLParser(matchedArticle.content)}</div>
					</div>
				);
			}}
		</Location>
	);
};

export const Article = ArticleInternal;
