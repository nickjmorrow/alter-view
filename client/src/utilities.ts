export const getFormattedDate = (date: string) => {
	const formattedDate = new Date(parseInt(date, 10));
	return `${monthNames[formattedDate.getMonth()]} ${formattedDate.getFullYear()}`;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const flickerWord = (words: string[], numRepeated: number): string[] => {
	let output: string[] = [];
	for (let i = 0; i < words.length - 1; i++) {
		const wordOne = words[i];
		const wordTwo = words[i + 1];
		const maxLength = Math.max(wordOne.length, wordTwo.length);

		output = [...output, ...Array(numRepeated).fill(wordOne)];
		let flickeringWord = wordOne;
		let tries = 0;
		const MAX_TRIES = 40;
		while (flickeringWord !== wordTwo && tries < MAX_TRIES) {
			const randomIndex = Math.floor(maxLength * Math.random());
			const flickeredWord = flickeringWord.split('');
			const oldLetter = flickeredWord[randomIndex];
			const newLetter = wordTwo[randomIndex];
			if (oldLetter === newLetter) {
				continue;
			}
			if (oldLetter === '#') {
				flickeredWord[randomIndex] = wordTwo[randomIndex];
			} else {
				flickeredWord[randomIndex] = '#';
			}

			flickeringWord = flickeredWord.join('');
			tries += 1;
			output.push(flickeringWord);
		}
	}

	return output;
};
