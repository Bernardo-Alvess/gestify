import { randomUUID } from 'node:crypto'

interface IServiceOrderProps {
    id?: string | null;
    description?: string | null;
    defect?: string | null;
    report?: string | null;
    extras?: string | null;
    companyId: string;
    statusId: string;
    userId: string;
    technicianId?: string | null;
    clientId?: string | null;
}

export class ServiceOrder {
    id?: string | null;
    description?: string | null
    defect?: string | null
    report?: string | null
    extras?: string | null
    date: Date = new Date();
    companyId: string;
    statusId: string;
    userId: string;
    technicianId?: string | null;
    clientId?: string | null;

    constructor(data: IServiceOrderProps) {
        if (data.id) {
            this.id = data.id
        } else {
            this.id = randomUUID()
        }

        this.description = data.description
        this.defect = data.defect
        this.extras = data.extras
        this.date = new Date()
        this.companyId = data.companyId
        this.clientId = data.clientId
        this.technicianId = data.technicianId
        this.statusId = data.statusId
        this.userId = data.userId
    }

}