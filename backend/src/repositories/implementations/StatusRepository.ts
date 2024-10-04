import { IUpdateStatusDto } from "../../entities/Status/dtos/IUpdateStatusDto";
import { Status } from "../../entities/Status/Status";
import { prisma } from "../../lib/prisma";
import { IStatusRepository } from "../IStatusRepository";

export class StatusRepository implements IStatusRepository {
    async createStatus(status: Status): Promise<void> {
        await prisma.status.create({
            data: status
        })
    }
    async deleteStatus(id: string): Promise<void> {
        await prisma.status.delete({
            where: {
                id
            }
        })
    }
    async updateStatus(id: string, status: IUpdateStatusDto): Promise<void> {
        await prisma.status.update({
            where: { id },
            data: {
                ...status
            }
        })
    }

    async getStatus(id: string): Promise<Status | undefined> {
        const status = await prisma.status.findUnique({
            where: { id }
        })

        if (status) return status

        return undefined
    }

    async getAllStatus(): Promise<Status[]> {
        return await prisma.status.findMany()
    }

}