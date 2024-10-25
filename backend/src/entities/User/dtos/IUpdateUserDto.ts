import { UserType } from "../user-type-enum"

export interface IUpdateUserDto {
    email: string
    name: string,
    number?: string | null
    address?: string | null,
    document: string,
    password: string
}