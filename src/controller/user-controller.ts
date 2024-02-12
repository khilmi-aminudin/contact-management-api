import { AuthRequest } from '../middleware/auth-middleware'
import service from '../service/user-service'
import {Request, Response, NextFunction} from 'express'

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await service.register(req.body)
        res.status(201).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const result = await service.get(authRequest.user?.username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    get
}