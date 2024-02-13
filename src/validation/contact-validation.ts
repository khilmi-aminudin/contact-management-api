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

export const getContactById = Joi.number().required().positive().label("contact_id")

export const searchContacts = Joi.object({
    page: Joi.number().positive().min(1).default(1),
    size: Joi.number().positive().min(1).max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
})