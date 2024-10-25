import { randomUUID } from 'node:crypto'
import { StatusEnum } from './status-enum';
import { stat } from 'node:fs';

interface IServiceOrderProps {
    id?: string;
    description?: string;
    defect?: string;
    report?: string;
    extras?: string;
    companyId: string;
    status: StatusEnum
    userId: string;
    technicianId?: string;
    clientId?: string;
}

export class ServiceOrder {
    public readonly id?: string
    public description?: string | null
    public defect?: string | null
    public report?: string | null
    public extras?: string | null
    public date: Date = new Date();
    public companyId: string;
    public status: StatusEnum
    public userId: string;
    public technicianId?: string | null
    public clientId?: string | null

    constructor(data: IServiceOrderProps) {
        if (data.id) {
            this.id = data.id
        } else {
            this.id = randomUUID()
        }

        this.description = data.description
        this.defect = data.defect
        this.extras = data.extras
        this.report = data.report
        this.date = new Date()
        this.companyId = data.companyId
        this.clientId = data.clientId
        this.technicianId = data.technicianId
        this.status = data.status
        this.userId = data.userId
    }

}