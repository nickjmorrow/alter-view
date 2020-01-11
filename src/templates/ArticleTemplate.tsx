import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';

const ArticleTemplate: React.FC<{ data: any }> = ({ data }) => {
	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	return (
		<Layout>
			<div style={{ maxWidth: '1200px' }}>
				<h1>{frontmatter.title}</h1>
				<span>{frontmatter.date}</span>
				<div style={{ marginTop: '64px' }} dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</Layout>
	);
};

export default ArticleTemplate;

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				path
				title
			}
		}
	}
`;
