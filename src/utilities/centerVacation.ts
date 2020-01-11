export const centerVacation = (segment: boolean[]): boolean[] => {
	let leftMost = -1;

	for (let i = 0; i < segment.length; i++) {
		if (segment[i]) {
			leftMost = i;
			break;
		}
	}

	let rightMost = -1;

	for (let i = segment.length; i >= 0; i--) {
		if (segment[i]) {
			rightMost = i;
			break;
		}
	}

	const vacationSegment = segment.slice(leftMost, rightMost + 1);

	while (vacationSegment.length < segment.length) {
		vacationSegment.unshift(false);

		if (vacationSegment.length === segment.length) {
			break;
		}

		vacationSegment.push(false);
	}

	return vacationSegment;
};
