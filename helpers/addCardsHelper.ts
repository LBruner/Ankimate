import {Card} from "../models/Card";
import {WordsData} from "../models/Words";

export const processCards = async (wordsData: WordsData) => {

    const addedCards: string[] = [];
    for (let curItem of wordsData.words) {
        if (curItem.word === '') continue;

        const card = new Card(curItem.word, curItem.phonetic, curItem.phrase, curItem.translation, wordsData.deck, wordsData.language.input);
        await card.addCard();
        addedCards.push(card.word);
    }

    return addedCards;
};


