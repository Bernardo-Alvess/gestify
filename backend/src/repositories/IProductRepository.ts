import { Product } from '../entities/Products/Product';
import { ILowStockProductDTO } from '../entities/Products/dtos/ILowStockProductDTO';
import { IUpdateProductDto } from '../entities/Products/dtos/IUpdateProductDto'; 

export interface IProductRepository {
  getProduct(id: string): Promise<Product | undefined>;
  updateProduct(id: string, productData: IUpdateProductDto): Promise<Product | undefined>;
  getProducts(companyId: string): Promise<Product[]>;
  createProduct(product: Product): Promise<void>;
<<<<<<< HEAD
  deleteProduct(id: string): Promise<boolean>;
  getLowStockProducts(companyId: string): Promise<Product[]>
=======
  deleteProduct(id: string): Promise<void>;
  getLowStockProducts(companyId: string): Promise<ILowStockProductDTO[]>
>>>>>>> 307db911e2ef926dd6e0d68b97ece748e2345558
  getProductCount(companyId: string): Promise<Number>
}