import express from 'express';
import { router } from './routes';
import { zodErrorHandler } from './middleware/zod-error-handler';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(zodErrorHandler)

export { app }