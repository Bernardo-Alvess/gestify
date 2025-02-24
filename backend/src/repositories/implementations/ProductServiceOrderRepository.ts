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


  async updateProductServiceOrder(
    id: string,
    data: IUpdateProductServiceOrderDto
  ): Promise<void> {
    try {
      const updated = await prisma.productServiceOrder.update({
        where: { id },
        data: {
          product: { connect: { id: data.productId } },
          serviceOrder: { connect: { id: data.serviceOrderId } },
          qtd: data.qtd,
        },
      });
    } catch (error) {
      console.error('Error updating ProductServiceOrder:', error);
      throw new Error('Failed to update ProductServiceOrder');
    }
  }


  async createProductServiceOrder(data: ProductServiceOrder) {
    await prisma.productServiceOrder.create({
      data: data
    });
  }

  async deleteProductServiceOrder(productId: string, serviceOrderId: string): Promise<void> {
    try {
      await prisma.productServiceOrder.delete({
        where: {
          productId_serviceOrderId: {
            productId,
            serviceOrderId
          }
        }
    });
    } catch (error) {
      console.log(error)
    }

  }

}