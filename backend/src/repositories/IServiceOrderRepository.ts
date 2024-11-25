import { IGetServiceOrderDto } from "../entities/ServiceOrder/dtos/IGetServiceOrderDto";
import { IUpdateServiceOrderDto } from "../entities/ServiceOrder/dtos/IUpdateServiceOrderDto";
import { ServiceOrder } from "../entities/ServiceOrder/ServiceOrder";

export interface IServiceOrderRepository {
    createServiceOrder(data: ServiceOrder): Promise<void>;
    getServiceOrder(id: string): Promise<IGetServiceOrderDto | undefined>;
    getServiceOrders(companyId: string): Promise<IGetServiceOrderDto[]>;
    updateServiceOrder(id: string, data: IUpdateServiceOrderDto): Promise<void>;
    deleteServiceOrder(id: string): Promise<boolean>;
    getSoCount(companyId: string): Promise<Number>
}