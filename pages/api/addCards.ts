import type {NextApiRequest, NextApiResponse} from 'next';
import {processCards} from "../../helpers/addCardsHelper";
import {WordsData} from "../../models/Words";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        if (!await isAnkiConnected()) {
            res.status(400).json({error: `Cant Connect to Anki connect.`});
            return;
        }

        const {words, deck, language} = req.body;
        const wordsData: WordsData = {words,deck,language}
        console.log(language);
        const cardsAdded = await processCards(wordsData);
        res.send({name: cardsAdded});
    }
}

export const isAnkiConnected = async () => {
    const ankiConnectPort = 'http://127.0.0.1:8765';
    try {
        await fetch(ankiConnectPort);
    } catch (e) {
        return false;
    }
    return true;
};
