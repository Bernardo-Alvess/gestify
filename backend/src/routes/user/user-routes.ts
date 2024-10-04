import { Router } from "express";
import { userController } from "../../controllers/UserController";
import { z } from "zod";
import { createUserSchema } from "../../lib/schemas/user/create-user-schema";
import { updateUserSchema } from "../../lib/schemas/user/update-user-schema";
import { adminMiddleware } from "../../middleware/admin-auth";

const userRouter = Router()

userRouter.post('/', adminMiddleware, (req, res, next) => {
    createUserSchema.parse(req.body)
    userController.createUser(req, res, next)
})

userRouter.get('/rotateste', adminMiddleware, (req, res, next) => {
    console.log(req.body)
    res.send('alo')
})

userRouter.get('/userCount', (req, res, next) => {
    userController.getUserCount(req, res, next)
})

userRouter.get('/', (req, res, next) => {
    userController.getUsers(req, res, next)
})

userRouter.get('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    userController.getUserById(req, res, next)
})

userRouter.put('/', adminMiddleware, (req, res, next) => {
    console.log('route handler')
    updateUserSchema.parse(req.body)
    userController.updateUser(req, res, next)
})

userRouter.delete('/:id', adminMiddleware, (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    userController.deleteUser(req, res, next)
})



export { userRouter }