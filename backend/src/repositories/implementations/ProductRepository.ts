
import { prisma } from "../../lib/prisma";
import { Product } from '../../entities/Products/Product';
import { IProductRepository } from '../IProductRepository';
import { IUpdateProductDto } from '../../entities/Products/dtos/IUpdateProductDto';
import { ILowStockProductDTO } from "../../entities/Products/dtos/ILowStockProductDTO";

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

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: { id },
      });
      return true
    } catch (e) {
      return false;
    }
  }

  async getProductCount(companyId: string): Promise<Number> {
    const count = await prisma.product.count({
      where: {
        companyId
      }
    })
    return count
  }

  async getLowStockProducts(companyId: string): Promise<ILowStockProductDTO[]> {
    try {
      const products = await prisma.product.findMany({
      where: {
        qtd: {
          lte: prisma.product.fields.minQtd,
          not: null
        },
        minQtd: {
          not: null
        }
        },
        select: {
          id: true,
          name: true,
          price: true,
          cost: true,
          unityType: true,
          qtd: true
        }
      })
    return products
    } catch (e) {
      console.error(e)
      return []
    }
  }

}