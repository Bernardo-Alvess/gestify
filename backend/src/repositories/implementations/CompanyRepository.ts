import { Company } from "../../entities/Company/Company";
import { IUpdateCompanyDto } from "../../entities/Company/dtos/IUpdateCompanyDto";
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

    async updateCompany(id: string, companyData: IUpdateCompanyDto): Promise<Company | undefined> {
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
        try {
            await prisma.company.create({ data: company })
        } catch (e) {
            if (e instanceof Error)
                throw new Error(e.message)
        }
    }

    async deleteCompany(id: string) {
        await prisma.company.delete({
            where: {
                id,
            }
        })
    }
}