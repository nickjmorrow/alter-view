import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Article } from '../types';
import { Link } from '@reach/router';
import { getPathFromTitle } from '../utilities/getPathFromTitle';

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

export const ArticleList: React.FC<{ path: string }> = ({ path }) => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: Article[] } }>(GatsbyQuery);

	return (
		<div>
			{articles.map(a => (
				<>
					<Link to={getPathFromTitle(a.title)}>{a.title}</Link>
					<div>{a.tagline}</div>
				</>
			))}
		</div>
	);
};
