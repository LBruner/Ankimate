import {getPuppeteerPage} from "./puppeteer";
import {Word} from "../models/word";
import stringSimilarity from 'string-similarity'
import axios from "axios";

const googleTTS = require('google-tts-api');

type cardsResults = {
    addedCards: Array<string>
    failedCards: Array<string>
}
export const processCards = async (words: Array<Word>) => {
    const puppeteer = await getPuppeteerPage();

    const cardsResults: cardsResults = {addedCards: [], failedCards: []};

    for (const word of words) {
        const hasErrors = checkIntegrity(word)

        if (hasErrors) {
            cardsResults.failedCards.push(word.wordName)
            continue;
        }

        try {
            const data: Word = await fetchData(puppeteer, word)
            const audioData = await addAudioFiles(data);
            await addCard(audioData)
            cardsResults.addedCards.push(word.wordName)
        } catch (e) {
            console.log(e)
            cardsResults.failedCards.push(word.wordName)
        }
    }

    await puppeteer.close();
    return cardsResults
}

const checkIntegrity = (word: Word) => {
    if (isExpression(splitSentence(word.wordName))) {
        if (!word.phonetic || !word.translation || !word.phrase) {
            console.log('Missing fields...')
            return true
        }
    }
    return false;
}

const fetchData = async (puppeteer: any, word: Word) => {

    const wordUrl = getWordLanguage(word.wordName, word.language)
    await puppeteer.goto(wordUrl);

    return await puppeteer.evaluate((words: Word) => {

        let {translation, phonetic, wordName, language, phrase} = words;

        translation = translation || document.querySelectorAll('.ToWrd')[1].innerText.split(" ")[0].replace(/[^a-zA-Z ]/g, "")
        phrase = phrase || document.querySelectorAll('.FrEx')[0].innerText
        phonetic = phonetic || document.querySelectorAll('.pronWR')[0].innerText

        return {
            wordName,
            translation,
            phonetic,
            phrase,
            language
        }
    }, word)
}

const addCard = async (cardData: Word) => {
    const formattedData = await formatData(cardData)
    const {wordAudio, phraseAudio} = cardData;

    const {language, phonetic, phrase, translation, wordName} = formattedData;

    const deck = language === 'en' ? 'English' : 'French'
    const body = {
        "action": "addNote", "version": 6, "params": {
            "note": {
                "deckName": `"${deck}"`, "modelName": "Basic", "fields": {
                    "Front": `${phrase}`,
                    "Back": `${wordName} ${phonetic} <br> ${translation}`
                }, "options": {
                    "allowDuplicate": true, "duplicateScope": deck, "duplicateScopeOptions": {
                        "deckName": deck, "checkChildren": true, "checkAllModels": false
                    }
                }, "audio": [{
                    "url": wordAudio,
                    "filename": `${Math.random()}.mp3`,
                    "skipHash": "7e2c2f954ef6051373ba916f000168dc",
                    "fields": ["Back"]
                }, {
                    "url": phraseAudio,
                    "filename": `${Math.random()}.mp3`,
                    "skipHash": "7e2c2f954ef6051373ba916f000168dc",
                    "fields": ["Front"]
                }]
            }
        }
    };

    axios.post('http://localhost:8765', body)
}

const getWordLanguage = (wordName: string, language: string) => {
    const dictionaryUrl = 'https://www.wordreference.com'

    return `${dictionaryUrl}/${language === 'en' ? 'enpt' : 'fren'}/${wordName}`;
}

const addAudioFiles = (word: Word) => {
    const getUrl = (searchTerm: string) => googleTTS.getAudioUrl(searchTerm, {
        lang: word.language, slow: false, host: 'https://translate.google.com',
    });

    const wordAudio = getUrl(word.wordName);
    const phraseAudio = getUrl(word.phrase);

    return {
        wordAudio,
        phraseAudio,
        ...word
    }
}


const formatData = (word: Word) => {
    let {phrase, wordName, language, phonetic, translation} = word;
    let wordsToFormat: string[] = [];

    const splitPhrase = splitSentence(phrase, language);

    const splitWord = splitSentence(wordName)

    if (isExpression(splitWord)) {

        const splitWord = splitSentence(wordName);

        for (let sentence of splitWord!) {
            const {bestMatch} = stringSimilarity.findBestMatch(sentence, splitPhrase!);

            if (bestMatch.rating < 0.5) continue;
            wordsToFormat.push(`${bestMatch.target}`);
        }
    } else {
        const {bestMatch} = stringSimilarity.findBestMatch(wordName.toLowerCase(), splitPhrase!);
        wordsToFormat.push(`${bestMatch.target}`);
        wordsToFormat[0].toUpperCase()
    }

    for (let sentence of wordsToFormat) {
        phrase = phrase.replace(new RegExp(`\\b${sentence}`, 'i'), `<font color="#7d00bc">${sentence}</font>`);
    }

    wordName = `<font color="#7d00bc">${wordName.toUpperCase()}</font>`
    phrase[0].toUpperCase();
    translation = `<b>${translation.toUpperCase()}</b>`
    phonetic = `(${phonetic})`
    return {
        phrase,
        wordName,
        translation,
        phonetic,
        language
    }
}

const splitSentence = (sentence: string, language?: string) => {
    if (language === 'en')
        return sentence.trimStart().replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
    else {

        return sentence.trimStart().split(' ')
    }
};

const isExpression = (sentence: string[]) => {
    return sentence.length > 1;
};


