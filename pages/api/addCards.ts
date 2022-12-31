import {NextApiRequest, NextApiResponse} from "next";
import {processCards} from "../../helpers/cards";
import {getPuppeteerPage} from "../../helpers/puppeteer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        
    if (req.method === "GET") {
        res.send({message: 'Puppeteer initialized...'})
    }

    if (req.method === "POST") {
        const results = await processCards(req.body)

        res.status(200).json(results)
    }
}
