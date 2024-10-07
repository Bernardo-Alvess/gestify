import { IUpdateServiceOrderDto } from "../entities/ServiceOrder/dtos/IUpdateServiceOrderDto";
import { ServiceOrder } from "../entities/ServiceOrder/ServiceOrder";

export interface IServiceOrderRepository {
    createServiceOrder(data: ServiceOrder): Promise<void>;
    getServiceOrder(id: string): Promise<ServiceOrder | undefined>;
    getServiceOrders(companyId: string): Promise<ServiceOrder[]>;
    updateServiceOrder(id: string, data: IUpdateServiceOrderDto): Promise<void>;
    deleteServiceOrder(id: string): Promise<void>;
    getSoCount(): Promise<Number>
}