import {NextApiRequest, NextApiResponse} from "next";
import path from "path";
import {readFile, writeFile} from 'fs/promises';
import * as fs from "fs";
import {Deck} from "../../models/Deck";
import {fetchUserDecks} from "../../helpers/fetchDecksHelper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const deckFilePath = await getDeckFile();
        const deckFile = await readFile(deckFilePath, 'utf-8');

        const deckData: Deck = JSON.parse(deckFile);

        if (deckData.allDecks.length === 0)
            await updateDeckFile(deckFilePath);

        res.json(deckFile);
    }
}

const updateDeckFile = async (deckFilePath: string)=>{
    const sortedDecks = await fetchUserDecks();
    const jsonData = JSON.stringify(sortedDecks, null, 2)
    await writeFile(deckFilePath, jsonData)
}

const getDeckFile = async () => {
    const deckFilePath = path.resolve(process.cwd(), 'user', 'decks.json');

    const deckDefault: Deck = {allDecks: [], favoriteDecks: []};
    await fs.promises.stat(deckFilePath).catch(async _ => {
        await writeFile(deckFilePath, JSON.stringify(deckDefault, null, 2), "utf8");
    });

    return deckFilePath;
};