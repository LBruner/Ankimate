import {cardInput} from "../models/wordInputModel";
import {Card} from "../models/Card";

export const processCards = async (wordList: cardInput[]) => {

    const addedCards: string[] = [];
    for (let curItem of wordList) {
        if (curItem.word === '') return;

        const card = new Card(curItem.word, curItem.phonetic, curItem.phrase, curItem.translation);
        await card.addCard();
        addedCards.push(card.word);
    }

    return addedCards;
}


