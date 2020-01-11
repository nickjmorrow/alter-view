import { addEntriesToSelection } from 'utilities/assignVacationToSegment';

const getInput = (arrayLength: number) => Array(arrayLength).fill(false);

describe('assign vacation to segment', () => {
	it('handles 000, 1', () => {
		expect(addEntriesToSelection(getInput(3), 1)).toEqual([false, true, false]);
	});

	it('handles 000, 2', () => {
		expect(addEntriesToSelection(getInput(3), 2)).toEqual([true, false, true]);
	});

	it('handles 000, 3', () => {
		expect(addEntriesToSelection(getInput(3), 3)).toEqual([true, true, true]);
	});

	it('handles 00000, 2', () => {
		expect(addEntriesToSelection(getInput(5), 2)).toEqual([true, false, false, false, true]);
	});

	it('handles 00000, 3', () => {
		expect(addEntriesToSelection(getInput(5), 3)).toEqual([true, false, true, false, true]);
	});

	it('handles 00000, 4', () => {
		expect(addEntriesToSelection(getInput(5), 4)).toEqual([true, true, true, false, true]);
	});

	it('handles 0000000000, 3', () => {
		expect(addEntriesToSelection(getInput(10), 3)).toEqual([
			true,
			false,
			false,
			false,
			false,
			true,
			false,
			false,
			false,
			true,
		]);
	});

	it('throws when less than 0', () => {
		expect(() => addEntriesToSelection(getInput(10), -2)).toThrowError(
			'Number of dates (-2) must be greater than 0.',
		);
	});

	it('throw when numDates > segment length', () => {
		expect(() => addEntriesToSelection(getInput(5), 6)).toThrowError(
			'Number of dates (6) exceeds segment length (5).',
		);
	});

	it('throws when segment is empty', () => {
		expect(() => addEntriesToSelection([], 1)).toThrowError('Segment must not be empty.');
	});
});
