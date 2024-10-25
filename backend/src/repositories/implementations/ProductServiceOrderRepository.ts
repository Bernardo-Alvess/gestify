import { prisma } from "../../lib/prisma";
import { ProductServiceOrder } from '../../entities/ProductServiceOrder/ProductServiceOrder';
import { IProductServiceOrderRepository } from '../IProductServiceOrderRepository';
import { IUpdateProductServiceOrderDto } from '../../entities/ProductServiceOrder/dtos/IUpdateProductServiceOrderDto';

export class ProductServiceOrderRepository implements IProductServiceOrderRepository {
    //pegando as relação entre produto e OS por ID;
    async getProductServiceOrder(id: string): Promise<ProductServiceOrder | undefined> {
      const data = await prisma.productServiceOrder.findUnique({
        where: { id },
      });
  
      if (data) {
        return new ProductServiceOrder({...data});
      }
      return undefined;
    }

    //pegando todas as relações?? validar depois...
    async getProductServiceOrders(): Promise<ProductServiceOrder[]> {
        const all = await prisma.productServiceOrder.findMany();
        return all.map((data) => new ProductServiceOrder(data));
    }

    //atualizando as relações no caso os ids?
    async updateProductServiceOrder(id: string, data: IUpdateProductServiceOrderDto): Promise<ProductServiceOrder | undefined> {
        await prisma.productServiceOrder.update({
          where: { id },
          data: {
            ...data,
          },
        });
    
        const productServiceOrder = await this.getProductServiceOrder(id);
        return productServiceOrder;
    }

      //criando uma relaçao
    async createProductServiceOrder(productServiceOrder: ProductServiceOrder){
        await prisma.productServiceOrder.create({
          data: productServiceOrder ,
        });
    }

      //deletando uma relação
    async deleteProductServiceOrder(id: string): Promise<void> {
        await prisma.productServiceOrder.delete({
          where: { id },
        });
    }

}