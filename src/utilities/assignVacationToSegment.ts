import { Throw } from 'utilities/Throw';
import { centerVacation } from 'utilities/centerVacation';

export const addEntriesToSelection = (segment: false[], numDates: number): boolean[] => {
	Throw.InvalidIf(segment.length === 0, 'Segment must not be empty.');
	Throw.InvalidIf(
		numDates > segment.length,
		`Number of dates (${numDates}) exceeds segment length (${segment.length}).`,
	);

	Throw.InvalidIf(numDates < 0, `Number of dates (${numDates}) must be greater than 0.`);

	if (numDates === segment.length) {
		return Array(numDates).fill(true);
	}

	if (numDates === 0) {
		return [...segment];
	}

	const numChildSegments = numDates + 1;
	const datesPerChildSegment = segment.length / numChildSegments;
	const output: boolean[] = [];
	let counter = 1;
	let numAdded = 0;
	for (let i = 0; i < segment.length; i++) {
		if (numAdded === numDates) {
			output.push(false);
			continue;
		}

		if (segment.length - i <= numDates - numAdded) {
			output.push(true);
			continue;
		}

		if (counter >= datesPerChildSegment) {
			counter = 0;
			numAdded += 1;
			output.push(true);
		} else {
			output.push(false);
		}
		counter += 1;
	}
	return centerVacation(output);
};
