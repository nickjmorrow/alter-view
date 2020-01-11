/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
	const blogPostTemplate = path.resolve(`src/templates/ArticleTemplate.tsx`);
	const result = await graphql(`
		{
			allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 100) {
				edges {
					node {
						frontmatter {
							path
						}
					}
				}
			}
		}
	`);
	if (result.errors) {
		reporter.panicOnBuilder(`Error while running GraphQL query.`);
		return;
	}

	const posts = result.data.allMarkdownRemark.edges;
	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		actions.createPage({
			path: post.node.frontmatter.path,
			component: blogPostTemplate,
			context: {
				previous,
				next,
			},
		});
	});
};
