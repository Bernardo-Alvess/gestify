import { Company } from "../entities/Company";

export interface ICompanyRepository {
    createCompany(company: Company): Promise<void>
}