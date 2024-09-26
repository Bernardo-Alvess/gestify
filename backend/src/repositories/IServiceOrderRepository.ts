import { ServiceOrder } from "../entities/ServiceOrder/ServiceOrder";

export interface IServiceOrderRepository {
    createServiceOrder(data: ServiceOrder): Promise<void>;
    getServiceOrder(id: string): Promise<ServiceOrder | undefined>;
    getServiceOrders(): Promise<ServiceOrder[]>;
    updateServiceOrder(id: string, data: ServiceOrder): Promise<void>;
    deleteServiceOrder(id: string): Promise<void>;
    getSoCount(): Promise<Number>
}