import { Router } from "express";
import { loginUserSchema } from "../../lib/schemas/auth/login-user-schema";
import { authController } from "../../controllers/AuthController";

const authRouter = Router()

authRouter.post('/login', (req, res, next) => {
    console.log(req.body)
    loginUserSchema.parse(req.body)
    console.log('parse 2')
    authController.login(req, res, next)
})

export { authRouter }