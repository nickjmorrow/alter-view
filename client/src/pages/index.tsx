import React from 'react';
import { ArticleList } from '../components/ArticleList';
import '../index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const IndexPage = () => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);

	return (
		<>
			<Router>
				<>
					<Route path={'/'} exact component={ArticleList} />
					{articles.map(a => (
						<Route path={'/' + getPathFromTitle(a.title)} component={() => <Article />} />
					))}
				</>
			</Router>
		</>
	);
};
export default IndexPage;
