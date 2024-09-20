import { Company } from "../entities/Company/Company";
import { IUpdateCompanyDto } from "../entities/Company/dtos/IUpdateCompanyDto";

export interface ICompanyRepository {
    createCompany(company: Company): Promise<void>
    deleteCompany(id: string): Promise<void>
    getCompanies(): Promise<Company[]>
    getCompany(id: string): Promise<Company | undefined>
    updateCompany(id: string, companyData: IUpdateCompanyDto): Promise<Company | undefined>
}