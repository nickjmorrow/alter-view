export const getBooleanArrayFromBinaryString = (binaryInput: string): boolean[] =>
	binaryInput.split('').map(v => v === '1');
