import { Company } from "../../entities/Company";
import { prisma } from "../../lib/prisma";
import { ICompanyRepository } from "../ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
    async createCompany(company: Company) {
        await prisma.company.create({ data: company })
    }
}