import { getSpread } from 'utilities/evenSelectionCreation/getSpread';
import { getBooleanArrayFromBinaryString } from 'utilities/testutilities/testUtilities/getBooleanArrayFromBinaryString';

describe('getSpread', () => {
	it('handles 1000100001', () => {
		expect(getSpread(getBooleanArrayFromBinaryString('1000100001'))).toBeCloseTo(0.588);
	});

	it('handles 1100000001', () => {
		expect(getSpread(getBooleanArrayFromBinaryString('1100000001'))).toBeCloseTo(0.286);
	});

	it('handles 01010', () => {
		expect(getSpread(getBooleanArrayFromBinaryString('01010'))).toBeCloseTo(Infinity);
	});

	it('handles 10001', () => {
		expect(getSpread(getBooleanArrayFromBinaryString('10001'))).toBeCloseTo(0.667);
	});
});
