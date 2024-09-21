import { Router } from "express";
import { userController } from "../../controllers/UserController";
import { z } from "zod";

const userRouter = Router()

userRouter.post('/', (req, res, next) => {
    userController.createUser(req, res, next)
})

userRouter.get('/', (req, res, next) => {
    userController.getUsers(req, res, next)
})

userRouter.get('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    userController.getUserById(req, res, next)
})
userRouter.delete('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    userController.deleteUser(req, res, next)
})
userRouter.put('/', (req, res, next) => {
    userController.updateUser(req, res, next)
})

export { userRouter }