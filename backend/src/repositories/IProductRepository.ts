import { Product } from '../entities/Products/Product';
import { ILowStockProductDTO } from '../entities/Products/dtos/ILowStockProductDTO';
import { IUpdateProductDto } from '../entities/Products/dtos/IUpdateProductDto'; 

export interface IProductRepository {
  getProduct(id: string): Promise<Product | undefined>;
  updateProduct(id: string, productData: IUpdateProductDto): Promise<Product | undefined>;
  getProducts(companyId: string): Promise<Product[]>;
  createProduct(product: Product): Promise<void>;
  deleteProduct(id: string): Promise<void>;
  getLowStockProducts(companyId: string): Promise<ILowStockProductDTO[]>
  getProductCount(companyId: string): Promise<Number>
}