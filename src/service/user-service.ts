import * as model from '../model/user-model'
import validation from '../validation/validation'
import * as userValidation from '../validation/user-validation'
import database from '../app/database'
import { ResponseError } from '../error/response-error'
import bcrypt from 'bcrypt'
import {v4 as uuid} from "uuid"
import user from '../entity/user'

const register = async (request: model.CreateUserRequest): Promise<model.UserResponse> => {
    const user = validation.validate(userValidation.createUser, request)

    const usersInDb: number = await database.user.count({
        where:{
            username: user.username
        }
    })

    if (usersInDb >= 1) {
        throw new ResponseError(400, 'username already exist')
    }

    user.password = await bcrypt.hash(user.password, 10)

    const result: model.UserResponse = await database.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })

    return result
}

const get = async (username: string ): Promise<model.UserResponse> => {
    username = validation.validate(userValidation.getUserByUsername, username)

    const user = await database.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    })

    if (!user) {
        throw new ResponseError(404, 'user not found')
    }

    return user
}

const logout = async (username: string ): Promise<String> => {
    username = validation.validate(userValidation.getUserByUsername, username)

    const user = await database.user.findUnique({
        where: {
            username: username
        },
        select: {
            token: true
        }
    })

    if (!user) {
        throw new ResponseError(404, 'user not found')
    }

    const token = await database.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            token: true
        }
    });

    if (!token) {
        return "Failed"
    }
    
    return "OK"
    
}

const login = async (request: model.GetUserByUsernameAndPassword) : Promise<{token: string | null}> => {
    request = validation.validate(userValidation.loginUser, request)

    const userInDb = await database.user.findUnique({
        where:{
            username: request.username
        },
        select: {
            password: true
        }
    })

    if (!userInDb) {
        throw new ResponseError(401, 'username or password wrong')
    }

    const isValidPassword = await bcrypt.compare(request.password, userInDb.password)
    
    if (!isValidPassword) {
        throw new ResponseError(401, 'username or password wrong')
    }

    const token = uuid().toString()

    return database.user.update({
        where:{
            username: request.username
        },
        data: {
            token: token
        },
        select:{
            token: true
        }
    })
}

const update = async (user: user ,request: model.UpdateUserRequest): Promise<model.UserResponse>  => {
    request = validation.validate(userValidation.updateUser, request)

    const userInDb = await database.user.count({
        where: {
            username: user.username,
            token: user.token
        }
    })

    if (!userInDb) {
        throw new ResponseError(404, "User not found")
    }

    return database.user.update({
        where: {
            username: user.username,
            token: user.token
        },
        data: request,
        select : {
            username: true,
            name: true
        }
    })

}

export default {
    register,
    login,
    logout,
    get,
    update
}