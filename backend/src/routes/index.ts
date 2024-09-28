import { Router } from "express";
import { companyRouter } from "./company/company-routes";
import { productRouter } from "./products/product-routes";

const router = Router()

router.use('/company', companyRouter)
router.use('/products', productRouter)

export { router }