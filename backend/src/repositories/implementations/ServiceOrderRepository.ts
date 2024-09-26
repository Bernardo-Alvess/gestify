import { ServiceOrder } from "../../entities/ServiceOrder/ServiceOrder";
import { prisma } from "../../lib/prisma";
import { IServiceOrderRepository } from "../IServiceOrderRepository";

export class ServiceOrderRepository implements IServiceOrderRepository {

    async createServiceOrder(serviceOrder: ServiceOrder): Promise<void> {
        await prisma.serviceOrder.create({
            data: serviceOrder
        });
    }
    async getServiceOrder(id: string): Promise<ServiceOrder | undefined> {
        const data = await prisma.serviceOrder.findUnique({
            where: {
                id
            }
        })

        if (data) return data

        return undefined

    }
    async getServiceOrders(): Promise<ServiceOrder[]> {
        return await prisma.serviceOrder.findMany()
    }

    async updateServiceOrder(id: string, data: ServiceOrder): Promise<void> {
        await prisma.serviceOrder.update({
            where: { id },
            data: data
        })
    }

    async deleteServiceOrder(id: string): Promise<void> {

        await prisma.serviceOrder.delete({
            where: { id }
        })

    }

    async getSoCount(): Promise<Number> {
        return await prisma.serviceOrder.count()
    }
}