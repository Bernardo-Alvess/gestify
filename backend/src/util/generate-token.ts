import jwt from 'jsonwebtoken'

import 'dotenv/config'

interface props {
    id: string,
    ownerId: string
}

const generateToken = ({ id, ownerId }: props) => {
    const secretKey = process.env.JWT_SECRET ?? 'abc123'
    const token = jwt.sign({ id, ownerId }, secretKey, { expiresIn: 24 * 60 * 60 * 3 })
    return token
}

export { generateToken }