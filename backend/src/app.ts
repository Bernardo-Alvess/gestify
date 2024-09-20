import express from 'express';
import { router } from './routes';
import { zodErrorHandler } from './middleware/zod-error-handler';

const app = express()

app.use(express.json())
app.use(router)
app.use(zodErrorHandler)

export { app }