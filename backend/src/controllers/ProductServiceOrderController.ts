import { Request, Response, NextFunction } from 'express';
import { ProductServiceOrderRepository } from '../repositories/implementations/ProductServiceOrderRepository';
import { ProductServiceOrder } from '../entities/ProductServiceOrder/ProductServiceOrder';
import { IUpdateProductServiceOrderDto } from '../entities/ProductServiceOrder/dtos/IUpdateProductServiceOrderDto';

class ProductServiceOrderController {
    constructor(private repository: ProductServiceOrderRepository) {}

    async createProductServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
          const { productId, serviceOrderId } = req.body;
    
          const productServiceOrder = new ProductServiceOrder({
            productId,
            serviceOrderId,
          });
    
          await this.repository.createProductServiceOrder(productServiceOrder);
    
          res.status(201).json({
            message: "ProductServiceOrder created successfully",
            productServiceOrder,
          });
        } catch (e) {
          next(e);
        }
      }

      async deleteProductServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
          const { id } = req.params;
          await this.repository.deleteProductServiceOrder(id);
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
          const { productId, serviceOrderId } = req.body;
          const updated = await this.repository.updateProductServiceOrder(id, { productId, serviceOrderId } as IUpdateProductServiceOrderDto);
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
            res.status(404).json({ message: 'Not found' });
          } else {
            res.json(productServiceOrder);
          }
        } catch (e) {
          next(e);
        }
        
      }


}


const productServiceOrderRepository = new ProductServiceOrderRepository();
const productServiceOrderController = new ProductServiceOrderController(productServiceOrderRepository);

export { productServiceOrderController };
