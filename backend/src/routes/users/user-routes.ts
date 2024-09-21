import { Router } from "express";
import { userController } from "../../controllers/UserController";

const userRouter = Router()

userRouter.post('/', (req, res, next) => {
    userController.createUser(req, res, next)
})

userRouter.get('/', (req, res, next) => {
    userController.getUsers(req, res, next)
})
userRouter.get('/:id', (req, res, next) => {
    userController.getUserById(req, res, next)
})
userRouter.delete('/:id', (req, res, next) => {
    userController.deleteUser(req, res, next)
})
userRouter.put('/', (req, res, next) => {
    userController.updateUser(req, res, next)
})

export { userRouter }