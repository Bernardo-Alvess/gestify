import { ProductServiceOrder } from '../entities/ProductServiceOrder/ProductServiceOrder';

export interface IProductServiceOrderRepository {
  getProductServiceOrder(id: string): Promise<ProductServiceOrder | undefined>;
  updateProductServiceOrder(id: string, data: ProductServiceOrder): Promise<ProductServiceOrder | undefined>;
  getProductServiceOrders(): Promise<ProductServiceOrder[]>;
  createProductServiceOrder(productServiceOrder: ProductServiceOrder): Promise<void>;
  deleteProductServiceOrder(id: string): Promise<void>;
}