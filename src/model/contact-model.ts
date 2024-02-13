export type CreateContactRequest = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
}

export type UpdateContactRequest = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
}