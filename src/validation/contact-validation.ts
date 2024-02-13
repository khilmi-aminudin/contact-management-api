import Joi from "joi";

export const createContact = Joi.object({
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).email().required(),
    phone: Joi.string().min(8).max(20).required(),
})

export const updateContact = Joi.object({
    id : Joi.number().positive().required(),
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).email().required(),
    phone: Joi.string().min(8).max(20).required(),
})