import { Router } from "express";
import { companyController } from "../../controllers/CompanyController";
import { createCompanySchema } from "../../lib/schemas/company/create-company-schema";
import { z } from "zod";
import { updateCompanySchema } from "../../lib/schemas/company/udpate-company-schema";

const companyRouter = Router()

companyRouter.delete('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    companyController.deleteCompany(req, res, next)
})

companyRouter.post('/', (req, res, next) => {
    createCompanySchema.parse(req.body)
    companyController.createCompany(req, res, next)
})

companyRouter.get('/', (req, res, next) => {
    companyController.getCompanies(req, res, next)
})

companyRouter.put('/', (req, res, next) => {
    updateCompanySchema.parse(req.body)
    companyController.updateCompany(req, res, next)
})

export { companyRouter }