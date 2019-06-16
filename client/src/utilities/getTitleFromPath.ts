export const getTitleFromPath = (path: string): string => {
	const splitPath = path.split('/').filter(p => p.length > 0);
	console.log(splitPath);
	const lastSubRoute = splitPath[splitPath.length - 1];
	const title = lastSubRoute.split('-').join(' ');
	return title;
};
