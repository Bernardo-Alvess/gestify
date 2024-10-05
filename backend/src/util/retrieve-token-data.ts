import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface TokenPayload {
    id: string;
    ownerId: string;
    userType: string;
}

const retrieveTokenData = (token: string): TokenPayload | null => {
    const secretKey = process.env.JWT_SECRET ?? 'abc123';
    try {
        const decoded = jwt.verify(token, secretKey) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error('Token inválido ou expirado');
        return null;
    }
}

export { retrieveTokenData }
