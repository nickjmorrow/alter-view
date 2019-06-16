/* 
	I have a list of words inside a paragraph (possibly a set of paragraphs). I also have a set of key phrases (.NET, React, Jenkins CI). I want to identify which phrases inside the paragraph can be considered "key phrases". Key phrases can be guaranteed not to be subsets of each other. E.g., "React" and "act" would not be valid. This should be case sensitive.

	inputs:
		* paragraph: string
		* key phrases: string[]

	output:
		* Pass back a list of {paragraphIndex: number, keyPhraseIndex: number} so that where each phrase occurs can be identified in the paragraph. 
	
	The application of this would be to identify in text where key technologies occur so that they can be replaced with a special component (maybe just formatted differently, maybe more). So this application would iterate through the output list and replace the length of the word at each paragraphIndex with a component. We know how much to delete because we know the length of each key phrase that occurs in the paragraph.

	Attempt 1:
		* Iterate through the list of key phrases, store the length for each
		* Iterate through each word in the paragraph. For each, iterate through the list of key phrases to determine if there is a match. If there is, then store the {paragraphIndex, keyPhraseIndex}. If there isn't, try and expand the search to the next word (e.g. 2 words), and only look through key phrases that are comprised of 2 words. Repeat until a key phrase is found or all keyPhrase distinct lengths are recorded.
 */

const punctuation = [',', '.', ';'];

export const findKeyPhrases = (
	text: string,
	keyPhrases: string[],
): { paragraphIndex: number; keyPhraseIndex: number }[] => {
	const possibleKeyPhraseLengths = keyPhrases
		.reduce<number[]>((agg, cur) => {
			const currentLength = cur.split(' ').length;
			if (!agg.some(length => length === currentLength)) {
				agg.push(currentLength);
			}
			return agg;
		}, [])
		.sort((a, b) => (a > b ? 1 : -1));
	const wordList = text.split(' ').map(word =>
		word
			.split('')
			.filter((letter, i) => !punctuation.some(p => p === letter) || i === 0)
			.join(''),
	);

	const output: { paragraphIndex: number; keyPhraseIndex: number }[] = [];

	for (let i = 0; i < wordList.length; i++) {
		for (let j = 0; j < possibleKeyPhraseLengths.length; j++) {
			const currentKeyPhraseLength = possibleKeyPhraseLengths[j];
			if (currentKeyPhraseLength + i > wordList.length + 1) {
				break;
			}
			const candidatePhrase = wordList.slice(i, i + currentKeyPhraseLength).join(' ');

			const matchingKeyPhrase = keyPhrases
				.filter(kp => kp.split(' ').length === currentKeyPhraseLength)
				.find(kp => kp === candidatePhrase);

			if (matchingKeyPhrase !== undefined) {
				const matchingKeyPhraseIndex = keyPhrases.indexOf(matchingKeyPhrase);

				output.push({
					keyPhraseIndex: matchingKeyPhraseIndex,
					paragraphIndex: i,
				});
			}
		}
	}

	return output.sort((a, b) => {
		if (a.paragraphIndex === b.paragraphIndex) {
			return a.keyPhraseIndex < b.keyPhraseIndex ? -1 : 1;
		}
		if (a.paragraphIndex < b.paragraphIndex) {
			return -1;
		}
		return 1;
	});
};
