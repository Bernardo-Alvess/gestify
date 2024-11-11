import { Router } from "express";
import { companyRouter } from "./company/company-routes";
import { userRouter } from "./user/user-routes";
import { authRouter } from "./auth/auth-routes";
import { serviceOrderRouter } from "./service-order/servicer-orders-routes";
import { productRouter } from "./products/product-routes";
import { productServiceOrderRouter } from "./ProductServiceOrder/product-service-order-routes";
import { homeRouter } from "./home/home-routes";

const router = Router()

router.use('/api/company', companyRouter)
router.use('/api/user', userRouter)
router.use('/api/auth', authRouter)
router.use('/api/service-order', serviceOrderRouter)
router.use('/api/product', productRouter)
router.use('/api/product-service-order', productServiceOrderRouter)
router.use('/api/home', homeRouter);

export { router }