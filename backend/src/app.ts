import express from 'express';
import { router } from './routes';
import { zodErrorHandler } from './middleware/zod-error-handler';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'https://gestify-frontend.onrender.com', 'https://gestify-wheat.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(router)
app.use(zodErrorHandler)

export { app }