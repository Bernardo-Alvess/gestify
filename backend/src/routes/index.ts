import { Router } from "express";
import { companyRouter } from "./company/company-routes";

const router = Router()

router.use('api/company', companyRouter)

export { router }