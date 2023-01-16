import {fetchData, getPuppeteerPage} from "./puppeteer";
import {CardOutput} from "../models/cardOutput";
import stringSimilarity from 'string-similarity'
import axios from "axios";
import {CardInput} from "../models/WordInput";

const googleTTS = require('google-tts-api');

type cardsResults = {
    addedCards: Array<string>
    failedCards: Array<string>
}
export const processCards = async (data: { words: Array<CardInput> }) => {
    const puppeteer = await getPuppeteerPage();
    const cardsResults: cardsResults = {addedCards: [], failedCards: []};

    for (const inputData of data.words) {

        if (!inputData.word) {
            continue;
        }

        try {
            const data: CardOutput = await fetchData(puppeteer, inputData)
            const audioData: CardOutput = addAudioFiles(data);
            await addCard(audioData)
            cardsResults.addedCards.push(inputData.word)
        } catch (e) {
            console.log(e)
            cardsResults.failedCards.push(inputData.word)
        }
    }

    await puppeteer.close();
    return cardsResults
}


const addCard = async (cardData: CardOutput) => {
    const formattedData = await formatData(cardData)
    const {wordAudio, phraseAudio} = cardData;

    const {language, phonetic, phrase, translation, word} = formattedData;
    console.log('OI', wordAudio)
    const deck = language === 'English' ? 'English' : 'French'
    const body = {
        "action": "addNote", "version": 6, "params": {
            "note": {
                "deckName": `"${deck}"`, "modelName": "Basic", "fields": {
                    "Front": `${phrase}`,
                    "Back": `${word} ${phonetic} <br> ${translation}`
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

    await axios.post('http://localhost:8765', body)
}


const addAudioFiles = (cardInput: CardInput) => {
    const getUrl = (searchTerm: string) => googleTTS.getAudioUrl(searchTerm, {
        lang: cardInput.language === 'English' ? 'en-US' : 'fr', slow: false, host: 'https://translate.google.com',
    });

    const wordAudio = getUrl(cardInput.word);
    const phraseAudio = getUrl(cardInput.phrase);
    console.log(wordAudio)
    return {
        wordAudio,
        phraseAudio,
        ...cardInput
    }
}


const formatData = (cardOutput: CardOutput) => {
    let {phrase, word, language, phonetic, translation} = cardOutput;
    let wordsToFormat: string[] = [];

    const splitPhrase = splitSentence(phrase, language);

    const splitWord = splitSentence(word)

    if (isExpression(splitWord!)) {

        const splitWord = splitSentence(word);

        for (let sentence of splitWord!) {
            const {bestMatch} = stringSimilarity.findBestMatch(sentence, splitPhrase!);

            if (bestMatch.rating < 0.5) continue;
            wordsToFormat.push(`${bestMatch.target}`);
        }
    } else {
        const {bestMatch} = stringSimilarity.findBestMatch(word.toLowerCase(), splitPhrase!);
        wordsToFormat.push(`${bestMatch.target}`);
        wordsToFormat[0].toUpperCase()
    }

    for (let sentence of wordsToFormat) {
        phrase = phrase.replace(new RegExp(`\\b${sentence}`, 'i'), `<font color="#7d00bc">${sentence}</font>`);
    }

    word = `<font color="#7d00bc">${word.toUpperCase()}</font>`
    phrase[0].toUpperCase();
    translation = `<b>${translation.toUpperCase()}</b>`
    phonetic = `(${phonetic})`
    return {
        phrase,
        word,
        translation,
        phonetic,
        language
    }
}

const splitSentence = (sentence: string, language?: string) => {
    if (!sentence)
        return;
    if (language === 'en')
        return sentence.trimStart().replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
    else {

        return sentence.trimStart().split(' ')
    }
};

const isExpression = (sentence: string[]) => {
    return sentence.length > 1;
};


