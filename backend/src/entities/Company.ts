import { randomUUID } from 'node:crypto'

interface ICompanyProps {
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
        this.id = randomUUID()
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.corporateReason = data.corporateReason;
        this.cnpj = data.cnpj;
    }
}