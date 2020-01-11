import * as React from 'react';
import { Typography, useThemeContext } from '@nickjmorrow/react-component-library';

export const Footer: React.FC = () => {
	const { appSettings } = useThemeContext();
	const urls = [
		{
			label: 'Github',
			url: appSettings.githubUrl,
		},
		{
			label: 'Portfolio',
			url: appSettings.portfolioUrl,
		},
	];

	return (
		<footer style={{ padding: '16px', width: '100%' }}>
			{urls.map(url => {
				return (
					<Typography style={{ marginRight: '16px' }}>
						<a href={url.url}>{url.label}</a>
					</Typography>
				);
			})}
		</footer>
	);
};
