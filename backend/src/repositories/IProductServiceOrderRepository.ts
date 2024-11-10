import { ProductServiceOrder } from '../entities/ProductServiceOrder/ProductServiceOrder';

export interface IProductServiceOrderRepository {
  getProductServiceOrder(serviceOrderId: string): Promise<ProductServiceOrder[]>;
  updateProductServiceOrder(id: string, data: ProductServiceOrder): Promise<void>;
  getProductServiceOrders(): Promise<ProductServiceOrder[]>;
  createProductServiceOrder(productServiceOrder: ProductServiceOrder): Promise<void>;
  deleteProductServiceOrder(id: string): Promise<void>;
}