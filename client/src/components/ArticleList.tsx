import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Article } from '../types';
import { Link } from '@reach/router';
import { getPathFromTitle } from '../utilities/getPathFromTitle';
import { Typography, Theme, useThemeContext } from '@nickjmorrow/react-component-library';
import styled from 'styled-components';
import { Header } from './Header';
import { TITLE } from '../constants';

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
	const theme = useThemeContext();
	return (
		<Wrapper>
			<Header>
				<Typography sizeVariant={8} weightVariant={7} fontFamilyVariant={'monospace'}>
					{TITLE}
				</Typography>
			</Header>
			<div>
				{articles.map(a => (
					<StyledArticleOption theme={theme}>
						<Link to={getPathFromTitle(a.title)}>
							<ArticleLinkTypography
								theme={theme}
								weightVariant={7}
								sizeVariant={6}
								link={getPathFromTitle(a.title)}
							>
								{a.title}
							</ArticleLinkTypography>
						</Link>
						<Typography style={{ display: 'block' }}>{a.tagline}</Typography>
					</StyledArticleOption>
				))}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-width: max-content;
	margin: 0 auto;
`;

const ArticleLinkTypography = styled(Typography)<{ theme: Theme }>`
	color: ${p => p.theme.colors.core.cs5};
	margin: ${p => p.theme.spacing.ss6} 0;
`;

const StyledArticleOption = styled('div')<{ theme: Theme }>`
	margin: ${p => p.theme.spacing.ss8} 0;
`;
