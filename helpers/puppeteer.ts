import puppeteer from "puppeteer";
import {CardInput} from "../models/WordInput";

export const getPuppeteerPage = async () => {
    const browser = await puppeteer.launch();
    return await browser.newPage()
}

export const fetchData = async (puppeteer: any, word: CardInput) => {
    const wordUrl = getWordLanguage(word.word, word.language)
    await puppeteer.goto(wordUrl);

    return await puppeteer.evaluate((words: CardInput) => {
        let {translation, phonetic, word, language, phrase} = words;

        translation = translation || document.querySelectorAll('.ToWrd')[1].innerText.split(" ")[0]
        phrase = phrase || document.querySelectorAll('.FrEx')[0].innerText

        if (word.split(' ').length == 1)
            phonetic = phonetic || document.querySelectorAll('.pronWR')[0].innerText
        else
            phonetic = ''
        return {
            word,
            translation,
            phonetic,
            phrase,
            language
        }
    }, word)
}

const getWordLanguage = (wordName: string, language: string) => {
    const dictionaryUrl = 'https://www.wordreference.com'

    return `${dictionaryUrl}/${language === 'English' ? 'enpt' : 'fren'}/${wordName}`;
}