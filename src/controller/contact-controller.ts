import { AuthRequest } from '../middleware/auth-middleware'
import {Request, Response, NextFunction} from 'express'
import service from '../service/contact-service'
import user from '../entity/user'
import * as model from "../model/contact-model"
import { error } from 'console'

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest: AuthRequest = req as AuthRequest
        const user: user = authRequest.user
        const request: model.CreateContactRequest = authRequest.body
        
        const result = await service.create(user, request)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user: user = authRequest.user
        const request: model.UpdateContactRequest = authRequest.body
        request.id = Number(authRequest.params.id)

        const result = await service.update(user, request)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user: user = authRequest.user
        const id = Number(authRequest.params.id)

        const result = await service.get(user, id)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user: user = authRequest.user
        const id = Number(authRequest.params.id)

        const result = await service.remove(user, id)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    get,
    remove
}