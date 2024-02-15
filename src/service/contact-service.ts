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
    id = validation.validate(contactValidation.getContactById, id);

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

const remove = async (user: user, id: number) : Promise<string> => {
    id = validation.validate(contactValidation.getContactById, id);

    const contact = await database.contact.findFirst({
        where: {
            id: id,
            username: user.username
        },
        select: {
            id: true,
            username: true
        }
    })

    if (!contact) {
        throw new ResponseError(404, "Contact not found")
    }

    const res = await database.contact.delete({
        where: {
            id: id,
            username: user.username
        }
    })

    if (res) {
        return "OK"
    } else {
        return "Failed"
    }
}

const search = async (user: user, request : model.SearchContactsRequest): Promise<model.SearchContactsResponse> => {

    request = validation.validate(contactValidation.searchContacts, request)
    
    const result: model.SearchContactsResponse = {
        data : [],
        paging: {
            page : -1,
            total_page: -1,
            total_item: -1
        }
    } 

    const filters: any[] = [
        { 
            username : user.username 
        }
    ]

    if (request.name){
        filters.push(               {
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }

    if (request.email){
        filters.push(                {
            email: {
                contains: request.email
            }
        })
    }

    if (request.phone){
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }

    const [page, size] = [Number(request.page), Number(request.size)]

    const skip = (page - 1) * size 

    const contacts : contact[] = await database.contact.findMany({
        where: {
            AND: filters
        },
        take: size,
        skip: skip
    })

    const totalContacts = await database.contact.count({
        where: {
            AND: filters
        }
    })

    result.data = contacts
    result.paging.page = page
    result.paging.total_page = Math.ceil(totalContacts / size)
    result.paging.total_item = totalContacts

    return result
}

export default {
    create,
    update,
    get,
    remove,
    search
}   