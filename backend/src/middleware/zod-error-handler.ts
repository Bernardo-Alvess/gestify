// middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Middleware de erro do Zod
const zodErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.errors.map(e => ({
                path: e.path,
                message: e.message
            })),
        });
    }

    res.status(500).json({ message: "Internal Server Error" });
};

export { zodErrorHandler }
