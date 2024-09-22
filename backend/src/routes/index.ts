import { Router } from "express";
import { companyRouter } from "./company/company-routes";
import { userRouter } from "./users/user-routes";

const router = Router()

router.use('/api/company', companyRouter)
router.use('/api/user', userRouter)

export { router }