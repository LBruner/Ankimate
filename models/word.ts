export interface Word{
    wordName: string,
    phonetic: string, 
    phrase: string,
    translation: string,
    language: string,
    isExpression?: boolean,
    wordAudio?: string, 
    phraseAudio?: string
}