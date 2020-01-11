import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

export const Header: React.FC<any> = ({ siteTitle }) => (
	<header
		style={{
			background: `rebeccapurple`,
			marginBottom: '64px',
			width: '100%',
		}}
	>
		<div
			style={{
				maxWidth: 960,
				padding: `1.45rem 1.0875rem`,
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link
					to="/"
					style={{
						color: `white`,
						textDecoration: `none`,
					}}
				>
					{siteTitle}
				</Link>
			</h1>
		</div>
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
