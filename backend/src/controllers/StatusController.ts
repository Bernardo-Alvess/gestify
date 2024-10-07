import { NextFunction, Request, Response } from "express";
import { StatusRepository } from "../repositories/implementations/StatusRepository";
import { Status } from "../entities/Status/Status";
import { CustomRequest } from "../@types/custom-request";

export class StatusController {
    constructor(
        private repository: StatusRepository
    ) { }

    async createStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const { name } = req.body
            const status = new Status({ name, companyId })

            await this.repository.createStatus(status)

            res.status(201).json({ created: true })
        } catch (e) {
            next(e)
        }
    }

    async getAllStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const status = await this.repository.getAllStatus(companyId)
            res.json({ status })
        } catch (e) {
            next(e)
        }
    }

    async getStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const status = await this.repository.getStatus(id)
            res.json({ status })
        } catch (e) {
            next(e)
        }
    }

    async deleteStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.repository.deleteStatus(id)
            res.json({ deleted: true })
        } catch (e) {
            next(e)
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { name } = req.body
            await this.repository.updateStatus(id, { name })
            res.send()
        } catch (e) {
            next(e)
        }
    }

}

const statusController = new StatusController(new StatusRepository())
export { statusController }