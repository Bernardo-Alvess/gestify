import { randomUUID } from 'node:crypto'

interface IStatusProps {
    name: string,
    companyId: string
}

export class Status {
    public readonly id: string
    public name: string;
    public companyId: string

    constructor(data: IStatusProps) {
        this.id = randomUUID();
        this.name = data.name
        this.companyId = data.companyId
    }
} 