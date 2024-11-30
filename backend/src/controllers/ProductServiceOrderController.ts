import { Request, Response, NextFunction } from 'express';
import { ProductServiceOrderRepository } from '../repositories/implementations/ProductServiceOrderRepository';
import { ProductServiceOrder } from '../entities/ProductServiceOrder/ProductServiceOrder';
import { IUpdateProductServiceOrderDto } from '../entities/ProductServiceOrder/dtos/IUpdateProductServiceOrderDto';
import { ProductRepository } from '../repositories/implementations/ProductRepository';
import { IGetProductForSo } from '../entities/ProductServiceOrder/dtos/IGetProductForSo';

class ProductServiceOrderController {
  constructor(
    private repository: ProductServiceOrderRepository,
    private productsRepository: ProductRepository
  ) { }

    async createProductServiceOrder(req: Request, res: Response, next: NextFunction) {

        try {
          const { productId, serviceOrderId, qtd } = req.body;
    
          const productServiceOrder = new ProductServiceOrder({
            productId,
            serviceOrderId,
            qtd
          });
    
          await this.repository.createProductServiceOrder(productServiceOrder);
    
          res.status(201).json({
            productServiceOrder,
          });
        } catch (e) {
          next(e);
        }
      }

      async deleteProductServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
          const { id, serviceOrderId } = req.params;
          await this.repository.deleteProductServiceOrder(id, serviceOrderId);
          res.json({ message: 'Deleted successfully' });
        } catch (e) {
          next(e);
        }
      }

      async getProductServiceOrders(req: Request, res: Response, next: NextFunction) {
        try {
          const productServiceOrders = await this.repository.getProductServiceOrders();
          res.json({ productServiceOrders });
        } catch (e) {
          next(e);
        }
      }

      async updateProductServiceOrders(req: Request, res: Response, next: NextFunction) {
        try {
          const { id } = req.params;
          const { productId, serviceOrderId, qtd } = req.body;
          const _qtd = parseInt(qtd)
          const updated = await this.repository.updateProductServiceOrder(id, { productId, serviceOrderId, qtd: _qtd } as IUpdateProductServiceOrderDto);
          res.json({ message: "Product updated successfully", updated });
        } catch (e) {
          next(e);
        }
      }

      async getProductServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
          const { id } = req.params;
          const productServiceOrder = await this.repository.getProductServiceOrder(id);

          if (!productServiceOrder) {
            return res.status(404).json({ message: 'Not found' });
          }

          //O ideal seria fazer um novo DTO para retornar da forma que está no momento, entrentando tenho preguiça
          const products = await Promise.all(
            productServiceOrder.map(async (item) => {
              const data = await this.productsRepository.getProduct(item.productId)
              if (data) {
                data.companyId = item.id
                data.qtd = item.qtd
              }
              return data 
            })
          )

          res.json(products)
        } catch (e) {
          next(e);
        }
      }


  async getUniqueById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.repository.getUniqueById(id)
      if (data) {
        const product = await this.productsRepository.getProduct(data.productId)

        if (product) {
          product.companyId = data!.id
          product.qtd = data?.qtd
          res.json(product)
        }

        //todo: ver se isso vai funcionar
        // const productForSo: IGetProductForSo = {
        //   id: data.id,
        //   productId: data.productId,
        //   serviceOrderId: data.serviceOrderId,
        //   name: product.name,
        //   price: product.price,
        //   cost: product.cost,
        //   qtd: data.qtd,
        //   unityType: product.unityType,
        // };

      }
    } catch (e) {
      next(e)
    }
  }
}

const productServiceOrderController =
  new ProductServiceOrderController(
    new ProductServiceOrderRepository,
    new ProductRepository
  );

export { productServiceOrderController };
