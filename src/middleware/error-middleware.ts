import { ResponseError } from "../error/response-error"
import { Request, Response, NextFunction} from 'express'


export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors : err.message
        })
    } else {
        res.status(500).json({
            errors : err.message
        })
    }
}