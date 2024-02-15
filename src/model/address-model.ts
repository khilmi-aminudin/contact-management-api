export type CreateAddressRequest = {
    street : string,
    city : string,
    province : string,
    country : string,
    postal_code : string
}

export type UpdateAddressRequest = {
    id: number,
    street : string,
    city : string,
    province : string,
    country : string,
    postal_code : string,
    contact_id : number
}