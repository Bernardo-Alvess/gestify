import { Router } from "express";
import { companyRouter } from "./company/company-routes";
import { userRouter } from "./user/user-routes";
import { authRouter } from "./auth/auth-routes";
import { serviceOrderRouter } from "./service-order/servicer-orders-routes";

const router = Router()

router.use('/api/company', companyRouter)
router.use('/api/user', userRouter)
router.use('/api/auth', authRouter)
router.use('/api/service-order', serviceOrderRouter)
export { router }