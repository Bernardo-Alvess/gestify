import { ProductRepository } from "../repositories/implementations/ProductRepository";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../@types/custom-request";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { ServiceOrderRepository } from "../repositories/implementations/ServiceOrderRepository";


class HomeController {
    constructor(
        private productRepository: ProductRepository,
        private userRepository: UserRepository,
        private serviceOrderRepository: ServiceOrderRepository
    ) {}

    async getHomeStats(req: Request, res: Response, next: NextFunction) {
        
        try {
            const companyId = (req as CustomRequest).token.ownerId;
            const totalProducts = await this.productRepository.getProductCount(companyId);
            const lowStockProducts = await this.productRepository.getLowStockProducts(companyId);
            const totalClients = await this.userRepository.getUserCount(companyId, 'CLIENT', undefined);
            const totalUsers = await this.userRepository.getUserCount(companyId, undefined, 'CLIENT')
            const totalSo = await this.serviceOrderRepository.getSoCount(companyId)

            res.json({
                totalProducts,
                lowStockProductsCount: lowStockProducts.length,
                lowStockProducts,
                totalClients,
                totalUsers,
                totalSo
            });
        } catch (error) {
            next(error);
        }
    }
}

const homeController = new HomeController(
    new ProductRepository,
    new UserRepository,
    new ServiceOrderRepository,
);

export { homeController };