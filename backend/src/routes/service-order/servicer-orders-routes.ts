import { Router } from "express";
import { serviceOrderController } from "../../controllers/ServiceOrderController";
const serviceOrderRouter = Router()

serviceOrderRouter.get('/:id', (req, res, next) => {
    serviceOrderController.getServiceOrder(req, res, next);
})

serviceOrderRouter.get('/', (req, res, next) => {
    serviceOrderController.getServiceOrders(req, res, next)
})

serviceOrderRouter.post('/', (req, res, next) => {
    serviceOrderController.createServiceOrder(req, res, next)
})

serviceOrderRouter.delete('/:id', (req, res, next) => {
    serviceOrderController.deleteServiceOrder(req, res, next)
})

serviceOrderRouter.put('/:id', (req, res, next) => {
    serviceOrderController.updateServiceOrders(req, res, next)
})

export { serviceOrderRouter }