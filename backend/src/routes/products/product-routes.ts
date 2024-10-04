import { Router } from 'express';
import  { productController }  from '../../controllers/ProductController';
import { createProductSchema} from "../../lib/schemas/products/create-product-schema";
import { z } from "zod";
import { auth } from '../../middleware/auth';
import { adminMiddleware } from '../../middleware/admin-auth';

const productRouter = Router();

productRouter.delete('/:id', auth, (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    productController.deleteProduct(req, res, next);
  });

productRouter.post('/', adminMiddleware, (req, res, next) => {
    createProductSchema.parse(req.body)
    productController.createProduct(req, res, next)
})

productRouter.get('/', (req, res, next) => {
    productController.getProducts(req, res, next)
})

productRouter.put('/', adminMiddleware, (req, res, next) => {
    productController.updateProduct(req, res, next)
})

export { productRouter }