import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import { AuthRepository } from "../repositories/implementations/AuthRepository"
import { generateToken } from "../util/generate-token"

export class AuthController {
    constructor(
        private repository: AuthRepository
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const user = await this.repository.findUser(email)

            if (!user) return res.status(400).json({ message: 'User not found' })

            const result = await bcrypt.compare(password, user.password)

            if (result) {
                const token = generateToken({ id: user.id, ownerId: user.companyId })
                res.cookie(
                    'jwt', token, {
                        path: '/',
                        maxAge: 3 * 24 * 60 * 60 * 1000,
                        secure: false,
                        httpOnly: false,
                        sameSite: 'none'
                })
                res.cookie(
                    'id', user.id, {
                        path: '/',
                        maxAge: 3 * 24 * 60 * 60 * 1000,
                        secure: false,
                        httpOnly: false,
                        sameSite: 'none'

                })
                return res.json({ logged: true })
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