import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import '../index.css';
import { Article } from '../types';

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

interface Data {
	articles: Article[];
}

const IndexPage = () => {
	const { data } = useStaticQuery<{ data: Data }>(GatsbyQuery);
	console.log(data);
	return (
		<>
			{data.articles.map(tl => (
				<div>{ReactHtmlParser(tl.content)}</div>
			))}
		</>
	);
};
export default IndexPage;
