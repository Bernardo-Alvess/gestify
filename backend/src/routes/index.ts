import { Router } from "express";
import { companyRouter } from "./company/company-routes";

const router = Router()

router.use('/company', companyRouter)

export { router }