export type CreateUserRequest = {
    username: string,
    password: string,
    name: string
}
export type UserResponse = {
    username: string,
    name: string
}
export type GetUserByUsernameAndPassword = {
    username: string,
    password: string
}
export type UpdateUserRequest = {
    password: string,
    name: string
}