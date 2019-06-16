export const getTitleFromPath = (path: string): string => {
	const splitPath = path.split('/').filter(p => p.length > 0);
	console.log(splitPath);
	const lastSubRoute = splitPath[splitPath.length - 1];
	if (lastSubRoute === undefined) {
		return undefined;
	}
	const title = lastSubRoute.split('-').join(' ');
	return title;
};
