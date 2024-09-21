import { randomUUID } from 'node:crypto'
import { UserType } from './user-type'

interface IUserProps {
    email: string
    name: string,
    number?: string
    address?: string,
    document: string,
    user_type: UserType,
    idCompany: string
}

export class User {
    public readonly id?: string
    public email: string
    public name: string
    public number?: string | undefined
    public address?: string | undefined
    public document: string
    public user_type: UserType;
    public idCompany: string

    constructor(id: string, data: IUserProps) {
        if (!id) {
            this.id = randomUUID()
        } else {
            this.id = id
        }

        this.email = data.email,
            this.name = data.name,
            this.number = data.number
        this.address = data.address
        this.document = data.document
        this.user_type = data.user_type
        this.idCompany = data.idCompany



    }

}