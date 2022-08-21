import type {NextApiRequest, NextApiResponse} from 'next';
import {processCards} from "../../helpers/addCardsHelper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        if (!await isAnkiConnected(res)) return;

        const {words} = req.body;
        const cardsAdded = await processCards(words);
        res.send({name: cardsAdded});
    }
}

const isAnkiConnected = async (res: NextApiResponse) => {
    const ankiConnectPort = 'http://127.0.0.1:8765';
    try {
        await fetch(ankiConnectPort);
    } catch (e) {
        res.status(404).json({message: `Cant Connect to Anki connect on port: ${ankiConnectPort}`});
        return false;
    }
    return true;
};
