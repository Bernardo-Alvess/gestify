import { Router } from "express";
import { serviceOrderController } from "../../controllers/ServiceOrderController";
import { createServiceOrderSchema } from "../../lib/schemas/service-orders/create-service-order-schema";
import { auth } from "../../middleware/auth";
import { updateServiceOrderSchema } from "../../lib/schemas/service-orders/update-service-order-schema";
const serviceOrderRouter = Router()

serviceOrderRouter.get('/count', auth, (req, res, next) => {
    serviceOrderController.getSoCount(req, res, next)
})

serviceOrderRouter.get('/client/:id/:type', auth, (req, res, next) => {
    serviceOrderController.getServiceOrderFor(req, res, next)
})

serviceOrderRouter.get('/:id', (req, res, next) => {
    serviceOrderController.getServiceOrder(req, res, next);
})

serviceOrderRouter.get('/', auth, (req, res, next) => {
    serviceOrderController.getServiceOrders(req, res, next)
})

serviceOrderRouter.post('/', auth, (req, res, next) => {
    createServiceOrderSchema.parse(req.body)
    serviceOrderController.createServiceOrder(req, res, next)
})

serviceOrderRouter.delete('/:id', auth, (req, res, next) => {
    serviceOrderController.deleteServiceOrder(req, res, next)
})

serviceOrderRouter.put('/:id', auth, (req, res, next) => {
    updateServiceOrderSchema.parse(req.body);
    serviceOrderController.updateServiceOrders(req, res, next)
})

export { serviceOrderRouter }