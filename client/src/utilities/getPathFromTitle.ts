const puncutation = ['?', '!', ',', '.'];

export const getPathFromTitle = (title: string): string =>
	title
		.split('')
		.filter(l => !puncutation.some(p => p === l))
		.join('')
		.split(' ')
		.join('-')
		.toLowerCase();
