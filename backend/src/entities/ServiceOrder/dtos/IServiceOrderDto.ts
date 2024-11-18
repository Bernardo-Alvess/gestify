interface IServiceOrderProps {
    id: string;
    description?: string | null;
    defect?: string | null;
    report?: string | null;
    extras?: string | null;
    number?: string | null
    companyId: string;
    status: string
    userId: string;
    technicianId?: string | null;
    clientId?: string | null;
}
