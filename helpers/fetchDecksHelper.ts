import axios from "axios";
import {isAnkiConnected} from "../pages/api/addCards";
import userDecks from '../user/decks.json';
import {Deck} from "../models/Deck";

export const fetchUserDecks = async () => {
    const url = 'http://localhost:8765';

    if (!await isAnkiConnected()) throw new Error(`Can't connect to Anki connect...`);

    const decks = await axios.post(url, {
        "action": "deckNames",
        "version": 6
    });

    let sortedList: Deck;

    if (userDecks.favoriteDecks) {
        sortedList = {allDecks: [...userDecks.favoriteDecks], favoriteDecks: userDecks.favoriteDecks};

        const filteredDeck = decks.data.result.filter((deckName: string) => !sortedList.allDecks.includes(deckName));

        for (let deckElement of filteredDeck) {
            sortedList.allDecks.push(deckElement);
        }
    } else {
        sortedList = {allDecks: [...decks.data.result], favoriteDecks: []};
    }
    
    return sortedList;
};
