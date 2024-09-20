import { Router } from "express";
import { companyController } from "../../controllers/CompanyController";

const companyRouter = Router()

companyRouter.delete('/:id', (req, res) => {
    companyController.deleteCompany(req, res)
})

companyRouter.post('/', (req, res) => {
    companyController.createCompany(req, res)
})

companyRouter.get('/', (req, res) => {
    companyController.getCompanies(req, res)
})

companyRouter.put('/', (req, res) => {
    companyController.updateCompany(req, res)
})

export { companyRouter }