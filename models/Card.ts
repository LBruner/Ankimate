import axios from "axios";

const googleTTS = require('google-tts-api');
import stringSimilarity from 'string-similarity';

export class Card {
    public wordAudio: string = '';
    public phraseAudio: string = '';

    constructor(public word: string, public phonetic: string, public phrase: string, public translation: string) {
        this.getAudioFiles();
    }

    public async addCard() {
        const {frontField, backField} = this.getCardFields();
        const cardModel = this.getCardModel(frontField, backField);

        await axios.post('http://localhost:8765', cardModel)
    }

    private getCardModel(frontField: string, backField: string) {
        return {
            "action": "addNote", "version": 6, "params": {
                "note": {
                    "deckName": 'English', "modelName": "Basic", "fields": {
                        "Front": frontField,
                        "Back": backField
                    }, "options": {
                        "allowDuplicate": false, "duplicateScope": "deck", "duplicateScopeOptions": {
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
        const splitPhrase = this.phrase.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ');

        const {bestMatch} = stringSimilarity.findBestMatch(this.word.toLowerCase(), splitPhrase);
        const matchWord = bestMatch.target;

        const frontField = this.phrase.replace(matchWord, `<font color="#1a90f0">${matchWord}</font>`);
        const backField = `<font color="#1a90f0">${this.word}</font> ${this.phonetic} <br><b>${this.translation}</b>`;
        return {frontField, backField};
    }

    private getAudioFiles() {
        const getUrl = (searchTerm: string) => googleTTS.getAudioUrl(searchTerm, {
            lang: 'en', slow: false, host: 'https://translate.google.com',
        });
        this.wordAudio = getUrl(this.word);
        this.phraseAudio = getUrl(this.phrase);
    }
}

export interface languageConfig {
    input: string,
    output: string
}