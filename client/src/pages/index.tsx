import React from 'react';
import { ArticleList } from '../components/ArticleList';
import '../index.css';
import 'normalize.css';
import { Router } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { Article as ArticleType } from '../types';
import { getPathFromTitle } from '../utilities/getPathFromTitle';
import { Article } from '../components/Article';
import { ThemeContext, getThemeFromNewInputs } from '@nickjmorrow/react-component-library';

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

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
			monospace: 'Fira Mono, monospace',
		},
	},
	defaultShowBoxShadow: false,
};

const IndexPage = () => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);

	return (
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
			<Router>
				<ArticleList path={'/'} />
				{articles.map(a => (
					<Article path={getPathFromTitle(a.title)} />
				))}
			</Router>
		</ThemeContext.Provider>
	);
};
export default IndexPage;
