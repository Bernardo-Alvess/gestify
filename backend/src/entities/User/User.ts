import { randomUUID } from 'node:crypto'
import { UserType } from './user-type-enum'

interface IUserProps {
    email: string
    name: string,
    number?: string | null
    address?: string | null,
    document: string,
    userType: UserType,
    companyId: string,
    password: string
    neighborhood?: string | null
    city?: string | null
}

export class User {
    public readonly id: string
    public email: string
    public name: string
    public number?: string | null
    public address?: string | null
    public neighborhood?: string | null
    public city?: string | null
    public document: string
    public userType: UserType;
    public companyId: string
    public password: string
    public date: Date = new Date() 

    constructor(data: IUserProps, id?: string) {
        if (!id) {
            this.id = randomUUID()
        } else {
            this.id = id
        }

        this.password = data.password
        this.email = data.email
        this.name = data.name
        this.number = data.number
        this.address = data.address
        this.document = data.document
        this.userType = data.userType
        this.companyId = data.companyId
        this.neighborhood = data.neighborhood
        this.city = data.city
    }

}