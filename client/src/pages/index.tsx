import React from 'react';
import { ArticleList } from '../components/ArticleList';
import '../index.css';
import { Router } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { Article as ArticleType } from '../types';
import { getPathFromTitle } from '../utilities/getPathFromTitle';
import { Article } from '../components/Article';

export const GatsbyQuery = graphql`
	{
		data {
			articles {
				articleId
				title
			}
		}
	}
`;
const Route: React.FC<{ path: string }> = ({ path, children }) => {
	return children;
};

const IndexPage = () => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);

	return (
		<>
			<Router>
				<ArticleList path={'/'} />
				{articles.map(a => (
					<Article path={getPathFromTitle(a.title)} />
				))}
			</Router>
		</>
	);
};
export default IndexPage;
