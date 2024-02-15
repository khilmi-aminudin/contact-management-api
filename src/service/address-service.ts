import user from "../entity/user"
import * as  model from "../model/address-model"
import validation from "../validation/validation"
import * as addressValidation from "../validation/address-validation"
import { getContactById } from "../validation/contact-validation"
import database from "../app/database"
import { ResponseError } from "../error/response-error"
import address from "../entity/address"

const checkContactInDb = async (user: user, contactId : number) : Promise<number> => {
    contactId = validation.validate(getContactById, contactId)
    const conactInDb = await database.contact.count({
        where: {
            id: contactId,
            username: user.username
        }
    })

    if (conactInDb !== 1) {
        throw new ResponseError(404, "contact not found")
    }

    return contactId
}

const create = async (user: user, contactId : number, request : model.CreateAddressRequest): Promise<address> => {
    contactId = await checkContactInDb(user, contactId)
    
    const addressRequest : address = validation.validate(addressValidation.createAddress, request)
    addressRequest.contact_id = contactId

    return database.address.create({
        data: addressRequest,
        select: {
            id:true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
            contact_id: true
        }
    })

}

const update = async (user: user, request : model.UpdateAddressRequest) : Promise<address> => {
    request.contact_id = await checkContactInDb(user, request.contact_id)

    const addressUpdateRequest: address = validation.validate(addressValidation.updateAddress, request)
    
    return database.address.update({
        where: {
            id: addressUpdateRequest.id,
            contact_id : addressUpdateRequest.contact_id
        },
        data: addressUpdateRequest,
        select: {
            id:true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
            contact_id: true
        }
    })
}

const get = async (user: user, contactId: number, addressId : number) : Promise<address> => {
    contactId = await checkContactInDb(user, contactId)

    addressId = validation.validate(addressValidation.getAddressById, addressId)

    const result = await database.address.findFirst({
        where: {
            id: addressId,
            contact_id: contactId
        },
        select: {
            id:true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
            contact_id: true
        }
    })

    if (!result) {
        throw new ResponseError(404, "address not found")
    }

    return result
}

const getAll = async (user: user, contactId : number): Promise<address[]> => {
    contactId = await checkContactInDb(user, contactId)

    const result : address[] = await database.address.findMany({
        where: {
            contact_id : contactId
        },
        select: {
            id:true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
            contact_id: true
        }
    })

    if (!result) {
        throw new ResponseError(404, "address not found")
    }

    return result
}

const remove = async (user: user, contactId: number, addressId: number) : Promise<string> => {
    contactId = await checkContactInDb(user, contactId)

    addressId = validation.validate(addressValidation.getAddressById, addressId)

    const addressInDb = await database.address.findFirst({
        where: {
            id: addressId,
            contact_id: contactId
        }
    })

    if (!addressInDb) {
        throw new ResponseError(404, "address not found")
    }

    const res = await database.address.delete({
        where: {
            id: addressId,
            contact_id: contactId
        }
    })

    if (!res) {
        return "Failed"
    }

    return "Ok"
}

export default {
    create,
    update,
    get,
    getAll,
    remove
}