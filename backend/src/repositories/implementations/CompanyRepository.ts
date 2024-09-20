import { Company } from "../../entities/Company/Company";
import { UpdateCompanyDto } from "../../entities/Company/dtos/UpdateCompanyDto";
import { prisma } from "../../lib/prisma";
import { ICompanyRepository } from "../ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {

    async getCompany(id: string): Promise<Company | undefined> {
        const data = await prisma.company.findUnique({
            where: { id }
        })

        if (data) return new Company({ ...data })

        return undefined
    }

    async updateCompany(id: string, companyData: UpdateCompanyDto): Promise<Company | undefined> {
        await prisma.company.update({
            where: { id },
            data: {
                ...companyData
            }
        })

        const company = this.getCompany(id)

        return company
    }
    async getCompanies(): Promise<Company[]> {
        return await prisma.company.findMany()
    }

    async createCompany(company: Company) {
        await prisma.company.create({ data: company })
    }

    async deleteCompany(id: string) {
        await prisma.company.delete({
            where: {
                id,
            }
        })
    }
}