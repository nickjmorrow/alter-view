interface WrappedDate {
	date: Date;
}

export const isCalendarDateEqual = (firstDate: WrappedDate, secondDate: WrappedDate) => {
	return (
		firstDate.date.getDate() === secondDate.date.getDate() &&
		firstDate.date.getMonth() === secondDate.date.getMonth() &&
		firstDate.date.getFullYear() === secondDate.date.getFullYear()
	);
};
