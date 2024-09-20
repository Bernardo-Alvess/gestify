import { randomUUID } from 'node:crypto'

interface ICompanyProps {
    id?: string;
    email: string;
    password: string;
    name: string;
    corporateReason: string;
    cnpj: string;
}

export class Company {
    public readonly id: string;
    public email: string;
    public password: string;
    public name: string;
    public corporateReason: string;
    public cnpj: string;

    constructor(data: ICompanyProps) {
        if (!data.id) {
            this.id = randomUUID()
        } else {
            this.id = data.id
        }
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.corporateReason = data.corporateReason;
        this.cnpj = data.cnpj;
    }
}