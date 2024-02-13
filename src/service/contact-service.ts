import user from "../entity/user"
import * as contactValidation from "../validation/contact-validation"
import * as model from "../model/contact-model"
import validation from "../validation/validation"
import contact from "../entity/contact"
import database from "../app/database"
import { ResponseError } from "../error/response-error"

const create = async (user: user, request: model.CreateContactRequest): Promise<contact> => {
    const contact: contact = validation.validate(contactValidation.createContact, request)
    contact.username = user.username

    return database.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            username: true
        }
    })

}

const update = async (user: user, request: model.UpdateContactRequest): Promise<contact> => {
    const contact: contact = validation.validate(contactValidation.updateContact, request)
    contact.username = user.username

    const contactInDb = await database.contact.count({
        where: {
            id: contact.id,
            username: contact.username
        }
    })

    if (contactInDb !== 1) {
        throw new ResponseError(404, "Contact not found")
    }

    return await database.contact.update({
        where:{
            id: contact.id,
            username: contact.username
        },
        data: contact,
        select:{
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            username: true
        }
    })
}

const get = async (user: user, id: number): Promise<contact> => {
    const contact = await database.contact.findFirst({
        where: {
            id: id,
            username: user.username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            username: true
        }
    })

    if (!contact) {
        throw new ResponseError(404, "Contact not found")
    }

    return contact
}

export default {
    create,
    update,
    get
}   