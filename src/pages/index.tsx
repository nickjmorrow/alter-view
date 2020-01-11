import {
	ArgumentType,
	getThemeFromNewInputs,
	updateThemeInputs,
	ThemeContext,
	Typography,
} from '@nickjmorrow/react-component-library';
import React from 'react';
import SEO from 'components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'components/Layout';
import { PostLink } from 'components/PostLink';
import styled from 'styled-components';

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
		},
	},
	colors: {
		core: {
			hue: 260,
			saturation: 100,
		},
		accent: {
			hue: 50,
			middleLightness: 47,
			saturation: 90,
		},
	},
	defaultShowBoxShadow: false,
};

const IndexPage: React.FC = () => {
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
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
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
		</ThemeContext.Provider>
	);
};

export default IndexPage;

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
