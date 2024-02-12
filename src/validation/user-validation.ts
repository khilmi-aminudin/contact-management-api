import Joi from "joi";
import * as model from '../model/user-model'

export const createUser: Joi.ObjectSchema<model.CreateUserRequest> = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    name: Joi.string().min(3).max(100).required()
})

export const getUserByUsername = Joi.string().min(3).max(100).required()

export const loginUser = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(8).max(100).required()
})