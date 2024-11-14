import { prisma } from "../../lib/prisma";
import { ProductServiceOrder } from '../../entities/ProductServiceOrder/ProductServiceOrder';
import { IProductServiceOrderRepository } from '../IProductServiceOrderRepository';
import { IUpdateProductServiceOrderDto } from '../../entities/ProductServiceOrder/dtos/IUpdateProductServiceOrderDto';

export class ProductServiceOrderRepository implements IProductServiceOrderRepository {
  async getProductServiceOrder(serviceOrderId: string): Promise<ProductServiceOrder[]> {
    const data = await prisma.productServiceOrder.findMany({
      where: {
        serviceOrderId
      },
    });

    return data
  }

  async getUniqueById(id: string): Promise<ProductServiceOrder | undefined> {
    const data = await prisma.productServiceOrder.findUnique({
      where: {
        id
      }
    })

    if (data) return data

    return undefined
  }

  async getProductServiceOrders(): Promise<ProductServiceOrder[]> {
    const all = await prisma.productServiceOrder.findMany();
    return all.map((data) => new ProductServiceOrder(data));
  }

  async updateProductServiceOrder(id: string, data: IUpdateProductServiceOrderDto): Promise<void> {
    await prisma.productServiceOrder.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return
  }

  async createProductServiceOrder(data: ProductServiceOrder) {
    await prisma.productServiceOrder.create({
      data: data
    });
  }

  async deleteProductServiceOrder(id: string): Promise<void> {
    await prisma.productServiceOrder.delete({
      where: { id },
    });
  }

}