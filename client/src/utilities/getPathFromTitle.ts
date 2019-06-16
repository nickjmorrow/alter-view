export const getPathFromTitle = (title: string): string =>
	title
		.split(' ')
		.join('-')
		.toLowerCase();
