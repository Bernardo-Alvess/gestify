import { Product } from '../entities/Products/Product';
import { IUpdateProductDto } from '../entities/Products/dtos/IUpdateProductDto'; 

export interface IProductRepository {
  getProduct(id: string): Promise<Product | undefined>;
  updateProduct(id: string, productData: IUpdateProductDto): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  createProduct(product: Product): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}