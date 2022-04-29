interface IHighlightLetters {
    letter: string;
    isHighlighted: boolean;
}

export const highlightSearchedLetters = (searchText: string, searchQuery: string): Array<IHighlightLetters>  => {

    const result: Array<IHighlightLetters> = [];

    const text: Array<string> = searchText.split('');
    const query: Array<string> = searchQuery.split('');

    const textLowerCase: Array<string> = searchText.toLowerCase().split('');
    const queryLowerCase: Array<string> = searchQuery.toLowerCase().split('');

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < query.length; j++) {
            if (textLowerCase[i] === queryLowerCase[j]) {

                const substr: string = searchText.slice(i, i + queryLowerCase.length);
                const substrLowerCase: string = searchText.toLowerCase().slice(i, i + queryLowerCase.length);

                const splittedSubstr: Array<string> = substr.split('');
                const splittedSubstrLowerCase: Array<string> = substrLowerCase.split('');

                if (JSON.stringify(splittedSubstrLowerCase) === JSON.stringify(queryLowerCase)) {

                    for (let k = 0; k < splittedSubstr.length; k++) {
                        result.push({
                            letter: splittedSubstr[k],
                            isHighlighted: true
                        })
                    }

                    i += splittedSubstr.length - 1;
                    break;
                }
            } else {
                result.push({
                    letter: text[i],
                    isHighlighted: false
                })
                break;
            }
        }
    }
    return result;
}