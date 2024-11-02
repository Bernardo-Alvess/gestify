import { prisma } from "../../lib/prisma";
import { ProductServiceOrder } from '../../entities/ProductServiceOrder/ProductServiceOrder';
import { IProductServiceOrderRepository } from '../IProductServiceOrderRepository';
import { IUpdateProductServiceOrderDto } from '../../entities/ProductServiceOrder/dtos/IUpdateProductServiceOrderDto';

export class ProductServiceOrderRepository implements IProductServiceOrderRepository {
    //pegando as relação entre produto e OS por ID;
  async getProductServiceOrder(serviceOrderId: string): Promise<ProductServiceOrder[]> {
    const data = await prisma.productServiceOrder.findMany({
      where: {
        serviceOrderId
      },
    });

    return data
    }

    //pegando todas as relações?? validar depois...
    async getProductServiceOrders(): Promise<ProductServiceOrder[]> {
        const all = await prisma.productServiceOrder.findMany();
        return all.map((data) => new ProductServiceOrder(data));
    }

    //atualizando as relações no caso os ids?
  async updateProductServiceOrder(id: string, data: IUpdateProductServiceOrderDto): Promise<void> {
        await prisma.productServiceOrder.update({
          where: { id },
          data: {
            ...data,
          },
        });
    
    //const productServiceOrder = await this.getProductServiceOrder(id);
    //return productServiceOrder;
    return
    }

      //criando uma relaçao
  async createProductServiceOrder(data: ProductServiceOrder) {
        await prisma.productServiceOrder.create({
          data: data
        });
    }

      //deletando uma relação
    async deleteProductServiceOrder(id: string): Promise<void> {
        await prisma.productServiceOrder.delete({
          where: { id },
        });
    }

}