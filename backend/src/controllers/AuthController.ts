import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import { AuthRepository } from "../repositories/implementations/AuthRepository"
import { generateToken } from "../util/generate-token"
import { ZodError } from "zod"

export class AuthController {
    constructor(
        private repository: AuthRepository
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const user = await this.repository.findUser(email)

            if (!user) return res.status(400).json({ messsage: 'User not found' })

            const result = await bcrypt.compare(password, user.password)

            if (result) {
                const token = generateToken({ id: user.id, ownerId: user.companyId })
                return res.json({ id: user.id, token })
            }

            return res.status(400).json({ message: 'Invalid password' })

        } catch (e) {
            next(e)
        }
    }


}

const repository = new AuthRepository()
const authController = new AuthController(repository)

export { authController }