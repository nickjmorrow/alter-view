export const getTitleFromPath = (path: string): string => {
	const splitPath = path.split('/');
	const lastSubRoute = splitPath[splitPath.length - 1];
	const title = lastSubRoute.split('-').join(' ');
	return title;
};
