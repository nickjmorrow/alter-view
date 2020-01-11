import { getGaps } from 'utilities/evenSelectionCreation/getGaps';

export const getSpread = (distribution: boolean[]): number => {
	return 1 / getStdDev(getGaps(distribution));
};

const getStdDev = (array: number[]) => {
	const n = array.length;
	const mean = array.reduce((a, b) => a + b) / n;
	const s = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
	return s;
};
