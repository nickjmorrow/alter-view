const path = require('path');

const puncutation = ['?', '!', ',', '.'];

const getPathFromTitle = title =>
	title
		.split('')
		.filter(l => !puncutation.some(p => p === l))
		.join('')
		.split(' ')
		.join('-')
		.toLowerCase();

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return graphql(`
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
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}
		console.log(result.data.data);
		return result.data.data.articles.forEach(({ title }) => {
			console.log(getPathFromTitle(title));
			return createPage({
				path: getPathFromTitle(title),
				component: path.resolve(__dirname, `src/components/ArticlePage.tsx`),
			});
		});
	});
};
