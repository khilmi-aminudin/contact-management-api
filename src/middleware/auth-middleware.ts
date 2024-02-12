import database from "../app/database";
import { Request, Response, NextFunction} from 'express'
import user from "../entity/user";
import logger from "../app/logger";

export interface AuthRequest extends Request {
    user : user
}

const _authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.get("Authorization");

        if (!token) {
            res.status(401).json({
                errrs : "unauthorized",
            }).end()
        } else {
            const user = await database.user.findFirst({
                where: {
                    token: token
                }
            })                       

            if (!user) {
                res.status(401).json({
                    errrs : "unauthorized",
                }).end()
            } else {
                req.user = user
                next()
            }
        }
    } catch (e) {
        logger.error('Error in authMiddleware:', e);
        res.status(500).json({
            errors: "Internal Server Error",
        }).end();
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await _authMiddleware(req as AuthRequest, res, next);
}