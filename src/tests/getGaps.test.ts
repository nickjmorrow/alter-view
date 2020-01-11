import { getGaps } from 'utilities/evenSelectionCreation/getGaps/getGaps';
import { getBooleanArrayFromBinaryString } from 'utilities/testutilities/testUtilities/getBooleanArrayFromBinaryString';

describe('get gaps', () => {
	it('throws when 0 assignments', () => {
		expect(() => getGaps([false, false, false])).toThrowError(
			'Number of assignments must be greater than 1, but was 0.',
		);
	});

	it('throws when 1 assignment', () => {
		expect(() => getGaps([false, true, false])).toThrowError(
			'Number of assignments must be greater than 1, but was 1.',
		);
	});

	it('returns empty array for entirely filled input', () => {
		expect(getGaps([true, true, true])).toEqual([]);
	});

	it('gets gaps for 01010', () => {
		expect(getGaps(getBooleanArrayFromBinaryString('01010'))).toEqual([2, 2, 2, 2]);
	});

	it('gets gaps for 0110001110', () => {
		expect(getGaps(getBooleanArrayFromBinaryString('0110001110'))).toEqual([2, 4, 2, 4]);
	});

	it('gets gaps for 1000100001', () => {
		expect(getGaps(getBooleanArrayFromBinaryString('1000100001'))).toEqual([1, 4, 5, 1, 5, 4]);
	});
});
