import { Router } from "express";
import { z } from "zod";
import { productServiceOrderController } from "../../controllers/ProductServiceOrderController"
import { createProductServiceOrderSchema } from "../../lib/schemas/product-service-order/create-product-service-order-schema";
import { auth } from "../../middleware/auth";

const productServiceOrderRouter = Router();

productServiceOrderRouter.get('/unique/:id', auth, (req, res, next) => {
    productServiceOrderController.getUniqueById(req, res, next)
})

productServiceOrderRouter.get('/:id', auth, (req, res, next) => {
    productServiceOrderController.getProductServiceOrder(req, res, next)
})

productServiceOrderRouter.get('/', auth, (req, res, next) => {
    productServiceOrderController.getProductServiceOrders(req, res, next)
})

productServiceOrderRouter.delete('/:id/:serviceOrderId', auth, (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    productServiceOrderController.deleteProductServiceOrder(req, res, next);
});

productServiceOrderRouter.post('/', auth, (req, res, next) => {

    createProductServiceOrderSchema.parse(req.body)
    productServiceOrderController.createProductServiceOrder(req, res, next)
})

productServiceOrderRouter.put('/:id', auth, (req, res, next) => {
    productServiceOrderController.updateProductServiceOrders(req, res, next)
})

export { productServiceOrderRouter }