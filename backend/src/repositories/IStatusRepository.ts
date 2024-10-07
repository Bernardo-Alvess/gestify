import { IUpdateStatusDto } from "../entities/Status/dtos/IUpdateStatusDto";
import { Status } from "../entities/Status/Status";

export interface IStatusRepository {
    createStatus(status: Status): Promise<void>
    deleteStatus(id: string): Promise<void>
    updateStatus(id: string, status: IUpdateStatusDto): Promise<void>
    getStatus(id: string): Promise<Status | undefined>
    getAllStatus(companyId: string): Promise<Status[]>
}