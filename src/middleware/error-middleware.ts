import { ResponseError } from "../error/response-error"
import { Request, Response, NextFunction} from 'express'


export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (!err) {
            next();
            return;
        }

        if (err instanceof ResponseError) {
            res.status(err.status).json({
                errors: err.message
            });
        } else {
            console.error(err); // Log unexpected errors for debugging
            res.status(500).json({
                errors: "Internal Server Error"
            });
        }
    } catch (error) {
        console.error(error); // Log any error occurred during error handling
        res.status(500).json({
            errors: "Internal Server Error"
        });
    }
}