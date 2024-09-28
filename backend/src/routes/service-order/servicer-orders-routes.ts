import { Router } from "express";
import { serviceOrderController } from "../../controllers/ServiceOrderController";
import { createServiceOrderSchema } from "../../lib/schemas/service-orders/create-service-order-schema";
const serviceOrderRouter = Router()

serviceOrderRouter.get('/count', (req, res, next) => {
    serviceOrderController.getSoCount(req, res, next)
})
serviceOrderRouter.get('/:id', (req, res, next) => {
    serviceOrderController.getServiceOrder(req, res, next);
})

serviceOrderRouter.get('/', (req, res, next) => {
    serviceOrderController.getServiceOrders(req, res, next)
})

serviceOrderRouter.post('/', (req, res, next) => {
    createServiceOrderSchema.parse(req.body)
    serviceOrderController.createServiceOrder(req, res, next)
})

serviceOrderRouter.delete('/:id', (req, res, next) => {

    serviceOrderController.deleteServiceOrder(req, res, next)
})

serviceOrderRouter.put('/:id', (req, res, next) => {
    serviceOrderController.updateServiceOrders(req, res, next)
})

export { serviceOrderRouter }