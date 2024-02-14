import { ParsedQs } from "qs"
import contact from "../entity/contact"

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

export type SearchContactsRequest = {
    page: string | string[] | ParsedQs | ParsedQs[] | undefined,
    size: string | string[] | ParsedQs | ParsedQs[] | undefined,
    name: string | string[] | ParsedQs | ParsedQs[] | undefined,
    email: string | string[] | ParsedQs | ParsedQs[] | undefined,
    phone: string | string[] | ParsedQs | ParsedQs[] | undefined
}

export type paging = {
    page : number,
    total_page : number,
    total_item : number
}

export type SearchContactsResponse = {
    data : contact[],
    paging : paging
}
