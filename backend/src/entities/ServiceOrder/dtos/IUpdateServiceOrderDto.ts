export interface IUpdateServiceOrderDto {
    description?: string;
    report?: string;
    defect?: string;
    extras?: string;
    status: string;
    userId: string;
    number: string
    technicianId?: string;
    clientId?: string;
}