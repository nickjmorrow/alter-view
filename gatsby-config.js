const path = require('path');
const { readdirSync } = require('fs');

const getDirectories = source =>
	readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

module.exports = {
	siteMetadata: {
		title: `ALTER VIEW`,
		description: `Personal blog.`,
		author: `Nicholas Morrow`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: './assets/favicon.png',
			},
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: 'Overpass',
						variants: [`400`, `600`, `700`, `800`],
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-styled-components`,
		},
		{
			resolve: `gatsby-plugin-root-import`,
			options: {
				...getDirectories('src').reduce((agg, cur) => {
					agg[cur] = path.join(__dirname, 'src', cur);
					return agg;
				}, {}),
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `article-pages`,
				path: `${__dirname}/src/article-pages`,
			},
		},
		`gatsby-transformer-remark`,
	],
};
