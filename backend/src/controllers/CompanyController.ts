import { ZodError } from "zod";
import { Company } from "../entities/Company/Company";
import { createCompanySchema } from "../lib/schemas/company/create-company-schema";
import { CompanyRepository } from "../repositories/implementations/CompanyRepository"
import { Request, Response, NextFunction } from 'express'
import { hashPassword } from "../util/hash-password";
import { generateToken } from "../util/generate-token";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { User } from "../entities/User/User";
import { UserType } from "../entities/User/user-type-enum";
import { AuthController, authController } from "./AuthController";

class CompanyController {
    constructor(
        private repository: CompanyRepository,
        private userRepository: UserRepository,
        private authController: AuthController
    ) {
    }

    async createCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password: plainPassword, name, corporateReason, cnpj } = req.body;
            const password = hashPassword(plainPassword)

            const company = new Company({ email, password, name, corporateReason, cnpj });

            await this.repository.createCompany(company)

            const user = new User({
                name: company.name,
                email: company.email,
                password: company.password,
                document: company.cnpj,
                userType: UserType.owner,
                companyId: company.id
            }, company.id)

            await this.userRepository.createUser(user)

            return res.status(201).json({ created: true })
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
const userRepository = new UserRepository()
const companyController = new CompanyController(companyRepository, userRepository, authController)

export { companyController }