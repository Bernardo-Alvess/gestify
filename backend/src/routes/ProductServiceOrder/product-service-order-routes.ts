import { Router } from "express";
import { z } from "zod";
import { productServiceOrderController } from "../../controllers/ProductServiceOrderController"
import { createProductServiceOrderSchema } from "../../lib/schemas/product-service-order/create-product-service-order-schema";

const productServiceOrderRouter = Router();

productServiceOrderRouter.delete('/:id',(req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    productServiceOrderController.deleteProductServiceOrder(req, res, next);
  });

  productServiceOrderRouter.post('/', (req, res, next) => {
    createProductServiceOrderSchema.parse(req.body)
    productServiceOrderController.createProductServiceOrder(req, res, next)
})

productServiceOrderRouter.get('/', (req, res, next) => {
    productServiceOrderController.getProductServiceOrders(req, res, next)
})

productServiceOrderRouter.put('/:id', (req, res, next) => {
    productServiceOrderController.updateProductServiceOrders(req, res, next)
})

export { productServiceOrderRouter }