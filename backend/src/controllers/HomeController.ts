import { ProductRepository } from "../repositories/implementations/ProductRepository";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../@types/custom-request";


class HomeController {
    constructor(
        private repository: ProductRepository
    ) {}

    async getHomeStats(req: Request, res: Response, next: NextFunction) {
        
        try {
            const companyId = (req as CustomRequest).token.ownerId;
            const totalProducts = await this.repository.getProductCount(companyId);
            const lowStockProducts = await this.repository.getLowStockProducts(companyId);

            res.json({
                totalProducts,
                lowStockProductsCount: lowStockProducts.length,
                lowStockProducts
            });
        } catch (error) {
            next(error);
        }
    }
}

const productRepository = new ProductRepository();
const homeController = new HomeController(productRepository);

export { homeController };