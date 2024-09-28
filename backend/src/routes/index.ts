import { Router } from "express";
import { companyRouter } from "./company/company-routes";
import { userRouter } from "./users/user-routes";
import { authRoutes } from "./auth-routes/auth-routes";
import { productRouter } from "./products/product-routes";

const router = Router()

router.use('/api/company', companyRouter)
router.use('/api/user', userRouter)
router.use('/api/auth', authRoutes)
router.use('/api/product', productRouter)

export { router }