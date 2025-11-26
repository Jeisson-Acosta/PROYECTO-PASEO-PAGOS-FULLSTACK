import { Router } from "express"
import { PaseoController } from "../controllers/paseo.js"

export const paseoRouter = Router()

paseoRouter.get('/', PaseoController.getAllInfo)
paseoRouter.post('/', PaseoController.savePerson)
paseoRouter.patch('/:id', PaseoController.updateInfo)
paseoRouter.delete('/:id', PaseoController.deletePerson)