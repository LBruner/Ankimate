import type {NextApiRequest, NextApiResponse} from 'next';
import {processCards} from "../../helpers/addCardsHelper";
import {WordsData} from "../../models/Words";
import CardAPIResponse from "../../models/API";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        
        if (!await isAnkiConnected()) {
            const response = new CardAPIResponse(403, 'Connection to AnkiConnect failed')
            res.send(response);
            return;
        }

        const {words, deck, language} = req.body;
        const wordsData: WordsData = {words, deck, language};

        const addedCards = await processCards(wordsData);
        const response = new CardAPIResponse(200, null, addedCards)
        res.send(response);
    }
}

export const isAnkiConnected = async () => {
    const ankiConnectPort = process.env.ANKICONNECT_PORT;
    try {
        await fetch(ankiConnectPort!);
    } catch (e) {
        return false;
    }
    return true;
};
