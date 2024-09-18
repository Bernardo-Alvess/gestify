import { Router } from "express";
import { companyController } from "../../controllers/CompanyController";

const companyRouter = Router()

companyRouter.get('/', (req, res) => {
    res.json({ msg: 'teste' });
})

companyRouter.post('/', (req, res) => {
    companyController.createCompany(req, res)
})

export { companyRouter }