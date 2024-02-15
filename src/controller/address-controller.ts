
import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../middleware/auth-middleware"
import user from "../entity/user"
import * as model from "../model/address-model"
import addressService from "../service/address-service"

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user : user = authRequest.user
        const contactId : number = Number(authRequest.params.contactId)
        const request : model.CreateAddressRequest = authRequest.body

        const result = await addressService.create(user, contactId, request)
        res.status(201).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user : user = authRequest.user
        const contactId : number = Number(authRequest.params.contactId)
        const addressId : number = Number(authRequest.params.addressId)
        const request : model.UpdateAddressRequest = authRequest.body
        request.contact_id = contactId
        request.id = addressId

        const result = await addressService.update(user, request)
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
        const user : user = authRequest.user
        const contactId : number = Number(authRequest.params.contactId)
        const addressId : number = Number(authRequest.params.addressId)

        const result = await addressService.get(user, contactId, addressId)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authRequest = req as AuthRequest
        const user : user = authRequest.user
        const contactId : number = Number(authRequest.params.contactId)

        const result = await addressService.getAll(user, contactId)
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
        const user : user = authRequest.user
        const contactId : number = Number(authRequest.params.contactId)
        const addressId : number = Number(authRequest.params.addressId)

        const result = await addressService.remove(user, contactId, addressId)
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
    getAll,
    remove
}