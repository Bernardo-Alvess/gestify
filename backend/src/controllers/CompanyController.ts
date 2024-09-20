import { ZodError } from "zod";
import { Company } from "../entities/Company/Company";
import { createCompanySchema } from "../lib/schemas/company/create-company-schema";
import { CompanyRepository } from "../repositories/implementations/CompanyRepository"
import { Request, Response, NextFunction } from 'express'
import { hashPassword } from "../util/hash-password";

class CompanyController {
    constructor(
        private repository: CompanyRepository
    ) { }

    async createCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password: plainPassword, name, corporateReason, cnpj } = req.body;
            const password = hashPassword(plainPassword)

            const company = new Company({ email, password, name, corporateReason, cnpj });
            await this.repository.createCompany(company)

            res.json({
                company: {
                    email, password, name, corporateReason, cnpj
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async deleteCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = req.params.id
            await this.repository.deleteCompany(companyId);
            res.json({ msg: "deleted" })
        } catch (e) {
            next(e)
        }

    }

    async getCompanies(req: Request, res: Response, next: NextFunction) {
        try {
            const companyes = await this.repository.getCompanies();
            res.json({ companyes })
        } catch (e) {
            next(e)
        }
    }

    async updateCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, email, password, name, corporateReason } = req.body
            const updatedCompany = await this.repository.updateCompany(id, { email, password, name, corporateReason })
            res.json({ updatedCompany })
        } catch (e) {
            next(e)
        }
    }
}

const companyRepository = new CompanyRepository()
const companyController = new CompanyController(companyRepository)

export { companyController }