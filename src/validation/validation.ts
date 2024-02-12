import { ObjectSchema, StringSchema, NumberSchema } from "joi"
import { ResponseError } from "../error/response-error"

type validationSchema = ObjectSchema | NumberSchema | StringSchema

const validate = (schema: validationSchema, request: any): any => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export default {
    validate
}