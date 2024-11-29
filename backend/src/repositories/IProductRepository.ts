import { Product } from '../entities/Products/Product';
import { IUpdateProductDto } from '../entities/Products/dtos/IUpdateProductDto'; 

export interface IProductRepository {
  getProduct(id: string): Promise<Product | undefined>;
  updateProduct(id: string, productData: IUpdateProductDto): Promise<Product | undefined>;
  getProducts(companyId: string): Promise<Product[]>;
  createProduct(product: Product): Promise<void>;
  deleteProduct(id: string): Promise<boolean>;
  getLowStockProducts(companyId: string): Promise<Product[]>
  getProductCount(companyId: string): Promise<Number>
}