import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
const SECRET_KEY = process.env.JWT_SECRET ?? 'abc123';

export interface CustomRequest extends Request {
    token: JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as CustomRequest).token = decoded;
        console.log(decoded)
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};
