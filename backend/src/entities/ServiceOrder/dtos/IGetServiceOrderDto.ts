export interface IGetServiceOrderDto {
    description?: string | null;
    defect?: string | null;
    report?: string | null;
    extras?: string | null;
    statusId: string;
    technicianId?: string | null;
    clientId?: string | null;
}