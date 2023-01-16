import axios from "axios";
import stringSimilarity from 'string-similarity';
import { availableInput } from "./WordInput";

const googleTTS = require('google-tts-api');

export class Card {
    public wordAudio: string = '';
    public phraseAudio: string = '';

    constructor(public word: string, public phonetic: string, public phrase: string, public translation: string, public deck: string, public language: availableInput) {
        this.getAudioFiles();

    }

    public async addCard() {
        const { frontField, backField } = this.getCardFields();
        const cardModel = this.getCardModel(frontField, backField);

        await axios.post('http://localhost:8765', cardModel);
    }

    private getCardModel(frontField: string, backField: string) {
        return {
            "action": "addNote", "version": 6, "params": {
                "note": {
                    "deckName": this.deck, "modelName": "Basic", "fields": {
                        "Front": frontField,
                        "Back": backField
                    }, "options": {
                        "allowDuplicate": true, "duplicateScope": this.deck, "duplicateScopeOptions": {
                            "deckName": 'English', "checkChildren": true, "checkAllModels": false
                        }
                    }, "audio": [{
                        "url": this.wordAudio,
                        "filename": `${Math.random()}.mp3`,
                        "skipHash": "7e2c2f954ef6051373ba916f000168dc",
                        "fields": ["Back"]
                    }, {
                        "url": this.phraseAudio,
                        "filename": `${Math.random()}.mp3`,
                        "skipHash": "7e2c2f954ef6051373ba916f000168dc",
                        "fields": ["Front"]
                    }]
                }
            }
        };
    }

    private getCardFields() {
        let wordsToFormat: string[] = [];

        const splitPhrase = this.splitSentence(this.phrase);

        const splitWord = this.splitSentence(this.word)

        if (isExpression(splitWord)) {

            const splitWord = this.splitSentence(this.word);

            for (let sentence of splitWord!) {
                const { bestMatch } = stringSimilarity.findBestMatch(sentence, splitPhrase!);

                if (bestMatch.rating < 0.5) continue;
                wordsToFormat.push(`${bestMatch.target}`);
            }
        }
        else {
            const { bestMatch } = stringSimilarity.findBestMatch(this.word.toLowerCase(), splitPhrase!);
            wordsToFormat.push(`${bestMatch.target}`);
            wordsToFormat[0].toUpperCase()
        }

        for (let sentence of wordsToFormat) {
            this.phrase = this.phrase.replace(new RegExp(`\\b${sentence}`, 'i'), `<font color="#1a90f0">${sentence}</font>`);
        }

        const frontField = this.phrase;
        frontField[0].toUpperCase()
        const backField = `<font color="#1a90f0">${this.word.toUpperCase()}</font> ${this.phonetic} <br><b>${this.translation.toUpperCase()}</b>  `;
        return { frontField, backField };
    }

    private getAudioFiles() {
        const getUrl = (searchTerm: string) => googleTTS.getAudioUrl(searchTerm, {
            lang: this.language, slow: false, host: 'https://translate.google.com',
        });
        this.wordAudio = getUrl(this.word);
        this.phraseAudio = getUrl(this.phrase);
    }

    public splitSentence = (sentence: string) => {
        if (this.language === 'en')
            return sentence.trimStart().replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
        else {

            return sentence.trimStart().split(' ')
        }
    };
}

const isExpression = (sentence: string[]) => {
    return sentence.length > 1;
};