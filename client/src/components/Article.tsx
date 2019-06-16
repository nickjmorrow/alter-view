import { Location, Link } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import parse, { DomElement, domToReact } from 'html-react-parser';
import { Article as ArticleType } from '../types';
import { getTitleFromPath } from '../utilities/getTitleFromPath';
import { Typography, useThemeContext } from '@nickjmorrow/react-component-library';
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

const ArticleInternal: React.FC<{ path: string }> = () => {
	const {
		data: { articles },
	} = useStaticQuery<{ data: { articles: ArticleType[] } }>(GatsbyQuery);

	const theme = useThemeContext();
	return (
		<>
			<Location>
				{({ location }) => {
					const matchedArticle = articles.find(
						a => convertTitle(a.title.toLowerCase()) === getTitleFromPath(location.pathname),
					);
					if (!matchedArticle) {
						return null;
					}
					return (
						<>
							<ArticleWrapper theme={theme}>
								<Header theme={theme}>
									<Link to={'/'}>
										<Typography
											sizeVariant={6}
											weightVariant={7}
											fontFamilyVariant={'monospace'}
											colorVariant={'core'}
										>
											{TITLE}
										</Typography>
									</Link>
								</Header>
								<Typography
									sizeVariant={9}
									weightVariant={7}
									style={{ display: 'block', marginBottom: theme.spacing.ss8, lineHeight: '54px' }}
								>
									{matchedArticle.title}
								</Typography>
								<div>{parse(matchedArticle.content, replaceOptions)}</div>
							</ArticleWrapper>
						</>
					);
				}}
			</Location>
		</>
	);
};

// TODO: centralize
const convertTitle = title =>
	title
		.split('')
		.filter(l => !['?', ',', '!', ','].some(p => p === l))
		.join('');

const replaceOptions = {
	replace: (domNode: DomElement) => {
		const { children } = domNode;
		console.log(domNode);
		if (domNode.name === 'p') {
			return <Typography style={{ display: 'block' }}>{domToReact(children)}</Typography>;
		}
	},
};

export const Article = ArticleInternal;

const ArticleWrapper = styled('div')<{ theme: Theme }>`
	max-width: ${p => p.theme.spacing.ss192};
	margin: 0 auto;
	padding: 0 ${p => p.theme.spacing.ss12};
`;
