import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express'
interface CustomRequest extends Request {
    token: JwtPayload;
}

export { CustomRequest }