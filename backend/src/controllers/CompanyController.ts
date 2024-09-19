import { Company } from "../entities/Company";
import { CompanyRepository } from "../repositories/implementations/CompanyRepository"
import { Request, Response } from 'express'

class CompanyController {
    constructor(
        private repository: CompanyRepository
    ) { }

    async createCompany(req: Request, res: Response) {

        const { email, password, name, corporateReason, cnpj } = req.body;

        const company = new Company({ email, password, name, corporateReason, cnpj });

        await this.repository.createCompany(company)

        res.json({
            company: {
                email, password, name, corporateReason, cnpj
            }
        })
    }

    async deleteCompany(req: Request, res: Response) {
        const companyId = req.params.id

        console.log(req.params.id)

        await this.repository.deleteCompany(companyId);

        res.json({ msg: "deleted" })
    }

    async getAllCompanies(req: Request, res: Response) {

    }
}

const companyRepository = new CompanyRepository()
const companyController = new CompanyController(companyRepository)

export { companyController }