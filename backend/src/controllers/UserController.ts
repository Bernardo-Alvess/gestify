import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../repositories/implementations/UserRepository'
import { User } from '../entities/User/User'
import { generateToken } from '../util/generate-token'
import { CustomRequest } from '../@types/custom-request'

export class UserController {
    constructor(
        private repository: UserRepository
    ) { }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId
            const { id, name, email, password, document, number, neighborhood, city, address, userType } = req.body
            const user = new User({ name, email, password, document, number, address, neighborhood, city, userType, companyId }, id)

            await this.repository.createUser(user)
            const token = generateToken({ id: user.id, ownerId: companyId, userType: user.userType })
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
            if (user) {
                res.json({ message: "Usuário deletado com sucesso!" });
            }else{
                res.json({ error: "Não foi possivel deletar!" });
            }
            
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { name, email, password, document, number, neighborhood, city, address } = req.body

            await this.repository.updateUser(id, { name, email, password, document, number, neighborhood, city,  address })

            res.status(200).json({ updated: true })
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId

            if ('usertype' in req.query) {
                const userTypeParam = (req.query.usertype as string).toUpperCase()
                const users = await this.repository.getUsers(companyId, userTypeParam, undefined)
                return res.status(200).json({ users })

            } else if ('except' in req.query) {    
                const exceptParam = (req.query.except as string).toUpperCase()
                const users = await this.repository.getUsers(companyId, undefined, exceptParam)
                return res.status(200).json({ users })

            }

            const users = await this.repository.getUsers(companyId)

            res.status(200).json({ users })
        } catch (e) {
            next(e)
        }
    }

    async getUserCount(req: Request, res: Response, next: NextFunction) {
        try {
            const companyId = (req as CustomRequest).token.ownerId

            if ('usertype' in req.query) {
                const userTypeParam = (req.query.usertype as string).toUpperCase()
                const count = await this.repository.getUserCount(companyId, userTypeParam, undefined)
                return res.status(200).json({ count })
            } else if ('except' in req.query) {
                const exceptParam = (req.query.except as string).toUpperCase()
                const count = await this.repository.getUserCount(companyId, undefined, exceptParam)
                return res.status(200).json({ count })
            }

            const count = await this.repository.getUserCount(companyId)
            res.status(200).json({ count })
        } catch (e) {
            next(e)
        }
    }

}

const repository = new UserRepository()
const userController = new UserController(repository)

export { userController }