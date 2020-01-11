import { Throw } from 'utilities/Throw';

export const getGaps = (distribution: boolean[]): number[] => {
	const numAssignments = distribution.reduce((agg, cur) => {
		if (cur) {
			agg += 1;
		}
		return agg;
	}, 0);

	Throw.InvalidIf(numAssignments <= 1, `Number of assignments must be greater than 1, but was ${numAssignments}.`);

	if (distribution.length === numAssignments) {
		return [];
	}

	const gaps: number[] = [];

	let distanceFromLeft = 0;

	for (let i = 0; i < distribution.length; i++) {
		if (distribution[i]) {
			break;
		}
		distanceFromLeft += 1;
	}

	let distanceFromRight = 0;

	for (let i = distribution.length - 1; i >= 0; i--) {
		if (distribution[i]) {
			break;
		}
		distanceFromRight += 1;
	}

	for (let i = 0; i < distribution.length; i++) {
		if (distribution[i] && !distribution[i - 1]) {
			let gapCounter = 0;
			let currentIndex = i;
			while (true) {
				gapCounter += 1;
				currentIndex -= 1;
				if (distribution[currentIndex]) {
					break;
				}
				if (currentIndex <= 0) {
					gapCounter += distanceFromRight;
					break;
				}
			}
			gaps.push(gapCounter);
		}
	}

	for (let i = distribution.length; i >= 0; i--) {
		if (distribution[i] && !distribution[i + 1]) {
			let gapCounter = 0;
			let currentIndex = i;
			while (true) {
				gapCounter += 1;
				currentIndex += 1;
				if (distribution[currentIndex]) {
					break;
				}
				if (currentIndex >= distribution.length - 1) {
					gapCounter += distanceFromLeft;
					break;
				}
			}
			gaps.push(gapCounter);
		}
	}

	return gaps;
};
