import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../repositories/implementations/UserRepository'
import { User } from '../entities/User/User'
import { generateToken } from '../util/generate-token'

export class UserController {
    constructor(
        private repository: UserRepository
    ) { }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, password, document, number, address, userType, companyId } = req.body

            const user = new User({ name, email, password, document, number, address, userType, companyId }, id)

            await this.repository.createUser(user)

            const token = generateToken({ id: user.id, ownerId: companyId })

            res.status(201).json({ id: user.id, token })

        } catch (e) {
            next(e)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const user = await this.repository.getUserById(id)

            res.status(200).json({ user })
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const user = await this.repository.deleteUser(id)

            res.status(200).json({ user })
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, password, document, number, address, userType } = req.body

            await this.repository.updateUser(id, { name, email, password, document, number, address, userType })

            res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.repository.getUsers()
            res.status(200).json({ users })
        } catch (e) {
            next(e)
        }
    }

}

const repository = new UserRepository()
const userController = new UserController(repository)

export { userController }