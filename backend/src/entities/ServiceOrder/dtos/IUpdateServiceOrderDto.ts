export interface IUpdateServiceOrderDto {
    description?: string;
    report?: string;
    defect?: string;
    extras?: string;
    statusId: string;
    userId: string;
    technicianId?: string;
    clientId?: string;
}