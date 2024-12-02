import { Request, Response, NextFunction } from 'express'

import { ServiceOrderRepository } from "../repositories/implementations/ServiceOrderRepository";
import { ServiceOrder } from '../entities/ServiceOrder/ServiceOrder';
import { CustomRequest } from '../@types/custom-request';

export class ServiceOrderController {
    constructor(
        private repository: ServiceOrderRepository
    ) { }

    async createServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const { id, description, defect, extras, clientId, technicianId, status, userId, report, number, date } = req.body

            const serviceOrder = new ServiceOrder({ id, description, defect, extras, companyId, clientId, technicianId, status, userId, report, number, date })
            console.log(serviceOrder)
            await this.repository.createServiceOrder(serviceOrder)

            res.status(201).json({ id: serviceOrder.id })
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
            const companyId = (req as CustomRequest).token.ownerId;
            const serviceOrders = await this.repository.getServiceOrders(companyId)
            res.json({ serviceOrders })
        } catch (e) {
            next(e)
        }
    }

    async getServiceOrderFor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, type } = req.params
            let serviceOrders = {}

            switch (type) {
                case 'CLIENT':
                    serviceOrders = await this.repository.getServiceOrdersForClient(id)
                    res.status(200).json({ serviceOrders })
                    break;
                case 'TECHNICIAN':
                    serviceOrders = await this.repository.getServiceOrdersForTechnician(id)
                    res.status(200).json({ serviceOrders })
                    break;
                default:
                    res.status(400).json({ message: 'Invalid type' })
                    break;
            }
        } catch (e) {
            next(e)
        }
    }

    async getServiceOrderForTechnician(req: Request, res: Response, next: NextFunction) {
        try {
            const technicianId = req.params.id
            const serviceOrders = await this.repository.getServiceOrdersForTechnician(technicianId)
            res.status(200).json({ serviceOrders })
        } catch (e) {
            next(e)
        }
    }

    async updateServiceOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { description, report, defect, extras, status, userId, technicianId, clientId, number } = req.body

            await this.repository.updateServiceOrder(id, { description, report, defect, extras, status, userId, technicianId, clientId, number })

            res.send()
        } catch (e) {
            next(e)
        }
    }

    async deleteServiceOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const result = await this.repository.deleteServiceOrder(id)
            if(result){
                res.json({ message: "Ordem deletada com sucesso!" });
            }else{
                res.json({ error: "Ordem com produtos adicionados!" });
            }
            
        } catch (e) {
            next(e)
        }
    }

    async getSoCount(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const count = await this.repository.getSoCount(companyId)
            res.json({ count })
        } catch (e) {
            next(e)
        }
    }
}

const serviceOrderController = new ServiceOrderController(new ServiceOrderRepository());
export { serviceOrderController }
