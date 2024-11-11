// import { NextFunction, Request, Response } from "express";
// import { auth, CustomRequest } from "./auth";

// export const adminOrOwnerAuth = async (req: Request, res: Response, next: NextFunction) => {

//     const token = req.header('Auth')

//     await auth(req, res, next);

//     const { userType } = (req as CustomRequest).token;

//     
//     if (userType == 'OWNER' || userType == 'ADMIN') {
//         return next()
//     }

//     return res.status(403).send('Access Denied')
// };

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import { CustomRequest } from "../@types/custom-request";
const SECRET_KEY = process.env.JWT_SECRET ?? 'abc123';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as CustomRequest).token = decoded;

        const { userType } = (req as CustomRequest).token;

        if (userType == 'ADMIN' || userType == 'OWNER') {
            return next()
        }

        return res.status(403).send('Access Denied')
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};
