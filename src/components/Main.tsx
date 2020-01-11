import * as React from 'react';
import { YearSelection } from 'components/YearSelection';
import { DateSelection } from 'components/DateSelection';
import { useThemeContext, Typography } from '@nickjmorrow/react-component-library';
import SEO from 'components/seo';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { PostLink } from 'components/PostLink';
import { Node } from 'types/Node';

export const Main: React.FC<{ data: any }> = () => {
	const theme = useThemeContext();
	const data = useStaticQuery(query);
	const nodes: Node[] = data.allMarkdownRemark.edges.map(
		({ node }): Node => {
			return {
				id: node.id,
				title: node.frontmatter.title,
				path: node.frontmatter.path,
				date: node.frontmatter.date,
			};
		},
	);
	return (
		<Layout mainStyle={{ flexDirection: 'column' }}>
			<SEO title="Home" />
			<Introduction style={{ height: '64px' }}>
				<Typography sizeVariant={6} style={{ padding: '32px 0 32px 0' }}>
					Hi, I'm Nick.
				</Typography>
			</Introduction>
			<section style={{ display: 'flex', flexDirection: 'column' }}>
				{nodes.map(n => (
					<PostLink node={n}>{n.title}</PostLink>
				))}
			</section>
		</Layout>
	);
};

export default Main;

const Introduction = styled('section')``;

export const query = graphql`
	query IndexQuery {
		allMarkdownRemark {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						path
						date(formatString: "DD MMMM, YYYY")
					}
				}
			}
		}
	}
`;
