import { Router } from "express";
import { loginUserSchema } from "../../lib/schemas/auth/login-user-schema";
import { authController } from "../../controllers/AuthController";

const authRouter = Router()

authRouter.post('/login', (req, res, next) => {

    loginUserSchema.parse(req.body)
    authController.login(req, res, next)
})

export { authRouter }