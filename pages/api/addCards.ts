import {NextApiRequest, NextApiResponse} from "next";
import {getPuppeteerPage} from "../../helpers/puppeteer";
import {Word} from "../../models/word";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('oi')
    if (req.method === "POST") {
        let wordDetails: Word = {...req.body}
        const wordUrl = `https://www.wordreference.com/${wordDetails.language === 'en' ? 'enpt' : 'fren'}/${wordDetails.wordName}`;

        const puppeteer = await getPuppeteerPage();
        await puppeteer.goto(wordUrl);
        console.log(wordUrl)
        const data = await puppeteer.evaluate((wordDetails: Word) => {
            let {meaning, phonetic, wordName, language, phrase} = wordDetails;

            meaning = meaning || document.querySelectorAll('.ToWrd')[1].innerText.split(" ")[0]
            phrase = phrase || document.querySelectorAll('.FrEx')[0].innerText
            phonetic = phonetic || document.querySelectorAll('.pronWR')[0].innerText
            
            return {
                wordName,
                meaning,
                phonetic,
                phrase,
                language
            }
        }, wordDetails)

        console.log(data)

        await puppeteer.close();
    }
}
