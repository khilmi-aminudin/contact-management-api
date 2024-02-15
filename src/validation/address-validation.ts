import Joi from "joi";

export const createAddress = Joi.object({
    street : Joi.string().min(1).max(100).required(),
    city : Joi.string().min(1).max(100).required(),
    province : Joi.string().min(1).max(100).required(),
    country : Joi.string().min(1).max(100).required(),
    postal_code : Joi.string().min(1).max(100).required()
})

export const updateAddress = Joi.object({
    id : Joi.number().positive().required().label("address_id"),
    street : Joi.string().min(1).max(100).required(),
    city : Joi.string().min(1).max(100).required(),
    province : Joi.string().min(1).max(100).required(),
    country : Joi.string().min(1).max(100).required(),
    postal_code : Joi.string().min(1).max(100).required(),
    contact_id : Joi.number().positive().required().label("contact_id")
})

export const getAddressById = Joi.number().required().positive().label("contact_id")
