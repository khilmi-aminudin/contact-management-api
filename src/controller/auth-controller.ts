import userService from '../service/user-service'
import {Request, Response, NextFunction} from 'express'

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    login
}