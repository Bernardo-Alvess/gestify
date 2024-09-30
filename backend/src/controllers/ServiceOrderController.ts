import { Request, Response, NextFunction } from 'express'

import { ServiceOrderRepository } from "../repositories/implementations/ServiceOrderRepository";
import { ServiceOrder } from '../entities/ServiceOrder/ServiceOrder';

export class ServiceOrderController {
    constructor(
        private repository: ServiceOrderRepository
    ) { }

    async createServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, description, defect, extras, companyId, clientId, technicianId, statusId, userId } = req.body

            const serviceOrder = new ServiceOrder({ id, description, defect, extras, companyId, clientId, technicianId, statusId, userId })

            await this.repository.createServiceOrder(serviceOrder)

            res.status(201).send()
        } catch (e) {
            next(e)
        }
    }

    async getServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const serviceOrder = await this.repository.getServiceOrder(id)

            res.json({ serviceOrder })
        } catch (e) {
            next(e)
        }
    }

    async getServiceOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const serviceOrders = await this.repository.getServiceOrders()

            res.json({ serviceOrders })
        } catch (e) {
            next(e)
        }
    }


    // TODO: implementar DTO para update de OS

    async updateServiceOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { description, report, defect, extras, statusId, userId, technicianId, clientId } = req.body

            await this.repository.updateServiceOrder(id, { description, report, defect, extras, statusId, userId, technicianId, clientId })

            res.send()
        } catch (e) {
            next(e)
        }
    }

    async deleteServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.repository.deleteServiceOrder(id)
            res.send()
        } catch (e) {
            next(e)
        }
    }

    async getSoCount(req: Request, res: Response, next: NextFunction) {
        try {
            const count = await this.repository.getSoCount()
            res.json({ count })
        } catch (e) {
            next(e)
        }
    }
}

const serviceOrderController = new ServiceOrderController(new ServiceOrderRepository());
export { serviceOrderController }