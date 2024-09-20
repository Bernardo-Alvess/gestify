import { Company } from "../entities/Company/Company";
import { UpdateCompanyDto } from "../entities/Company/dtos/UpdateCompanyDto";

export interface ICompanyRepository {
    createCompany(company: Company): Promise<void>
    deleteCompany(id: string): Promise<void>
    getCompanies(): Promise<Company[]>
    getCompany(id: string): Promise<Company | undefined>
    updateCompany(id: string, companyData: UpdateCompanyDto): Promise<Company | undefined>
}