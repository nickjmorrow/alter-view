import * as React from 'react';
import { Link } from 'gatsby';
import { Node } from 'types/Node';
import { Typography } from '@nickjmorrow/react-component-library';

export const PostLink: React.FC<{ node: Node }> = ({ node }) => {
	return (
		<Link to={node.path} style={{ padding: '16px 0 16px 0', textDecoration: 'none', width: 'max-content' }}>
			<Typography sizeVariant={7}>{node.title}</Typography>
		</Link>
	);
};
