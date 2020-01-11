import { getSelectionPossibilities } from 'utilities/evenSelectionCreation/getSelectionPossibilities';

const getInput = (arrayLength: number) => Array(arrayLength).fill(false);

describe('get vacation possibilities', () => {
	it('base', () => {
		expect(getSelectionPossibilities(getInput(10), 3)).toEqual([
			[false, false, false, true, false, false, true, true, false, false],
			[false, false, false, true, false, true, false, true, false, false],
			[false, false, true, false, false, false, true, false, true, false],
			[false, false, true, false, false, true, false, false, true, false],
		]);
	});
});
