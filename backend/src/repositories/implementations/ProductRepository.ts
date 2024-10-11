
import { prisma } from "../../lib/prisma";
import { Product } from '../../entities/Products/Product';
import { IProductRepository } from '../IProductRepository';
import { IUpdateProductDto } from '../../entities/Products/dtos/IUpdateProductDto'; 

export class ProductRepository implements IProductRepository {
  async getProduct(id: string): Promise<Product | undefined> {
    const data = await prisma.product.findUnique({
      where: { id },
    });

    if (data) return new Product({ ...data });

    return undefined;
  }

  async updateProduct(id: string, productData: IUpdateProductDto): Promise<Product | undefined> {
    await prisma.product.update({
      where: { id },
      data: {
        ...productData,
      },
    });

    const product = this.getProduct(id);
    return product;
  }

  async getProducts(companyId: string): Promise<Product[]> {
    return await prisma.product.findMany({
      where: {
        companyId
      }
    });
      }

  async createProduct(product: Product) {
    await prisma.product.create({
      data: product,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async getProductCount(companyId: string): Promise<Number> {
    const count = await prisma.product.count({
      where: {
        companyId
      }
    })

    return count
  }

  async getLowStockProducts(companyId: string): Promise<Product[]> {

    const products = prisma.product.findMany({
      where: {
        qtd: {
          lte: prisma.product.fields.minQtd,
          not: null
        },
        minQtd: {
          not: null
        }
      }
    })

    return products
  }

}