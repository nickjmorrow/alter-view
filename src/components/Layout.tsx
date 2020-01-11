/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import './layout.css';
import { Footer } from 'components/Footer';

const Layout: React.FC<{ children: React.ReactNode; mainStyle?: React.CSSProperties }> = ({ children, mainStyle }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQoutuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center' }}>
			<Header siteTitle={data.site.siteMetadata.title} />
			<main style={{ display: 'flex', flex: '1', width: '100%', padding: `0 64px 0 64px`, ...mainStyle }}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
