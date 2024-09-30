import { Router } from "express";
import { statusController } from "../../controllers/StatusController";
import { z } from "zod";
import { updateStatusSchema } from "../../lib/schemas/status/update-status-schema";
import { createStatusSchema } from "../../lib/schemas/status/create-status-schema";

const statusRouter = Router()

statusRouter.get('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    statusController.getStatus(req, res, next)
})

statusRouter.get('/', (req, res, next) => {
    statusController.getAllStatus(req, res, next)
})

statusRouter.post('/', (req, res, next) => {
    createStatusSchema.parse(req.body)
    statusController.createStatus(req, res, next)
})

statusRouter.delete('/:id', (req, res, next) => {
    const idSchema = z.string().uuid()
    idSchema.parse(req.params.id)
    statusController.deleteStatus(req, res, next)
})

statusRouter.put('/:id', (req, res, next) => {
    updateStatusSchema.parse({ id: req.params.id, body: req.body })
    statusController.updateStatus(req, res, next)
})

export { statusRouter }