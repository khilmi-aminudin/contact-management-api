export class ResponseError extends Error {
    status: number
    constructor(status: number, message: string | undefined){
        super(message)
        this.status = status
    }
}