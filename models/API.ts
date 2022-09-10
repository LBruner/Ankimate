class CardAPIResponse {
    constructor(public statusCode: number,public error: string | null, public addedCards?: string[]) {
    }
}

export default CardAPIResponse;