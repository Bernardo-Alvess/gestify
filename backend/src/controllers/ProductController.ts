import { Request, Response, NextFunction } from "express";
import { ProductRepository } from "../repositories/implementations/ProductRepository";
import { Product } from "../entities/Products/Product";
import { IUpdateProductDto } from "../entities/Products/dtos/IUpdateProductDto";
import { CustomRequest } from "../@types/custom-request";

class ProductController {
    constructor(
        private repository: ProductRepository
    ) { }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const { name, price, cost, unityType, minQtd, qtd } = req.body;

            const product = new Product({ name, price, cost, unityType, minQtd, qtd, companyId });
            await this.repository.createProduct(product);

            res.status(201).json({
                message: "Product created successfully",
                product
            });

        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;
            await this.repository.deleteProduct(productId);
            res.json({ message: "Product deleted successfully" });
        } catch (e) {
            next(e);
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.repository.getProducts();
            res.json({ products });
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, price, cost, unityType, minQtd, qtd } = req.body;
            const updatedProduct = await this.repository.updateProduct(id, { name, price, cost, unityType, minQtd, qtd } as IUpdateProductDto);
            res.json({ message: "Product updated successfully", updatedProduct });
        } catch (e) {
            next(e);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;
            const product = await this.repository.getProduct(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ product });

        } catch (e) {
            next(e);
        }
    }
}

const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);

export { productController };