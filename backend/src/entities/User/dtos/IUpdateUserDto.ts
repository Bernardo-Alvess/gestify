import { UserType } from "../user-type"

export interface IUpdateUserDto {
    email: string
    name: string,
    number?: string | null
    address?: string | null,
    document: string,
    userType: UserType,
    password: string
}