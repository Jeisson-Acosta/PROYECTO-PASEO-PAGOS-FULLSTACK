import { PaseoModel } from "../models/paseo.js"
import { validatePaseo, validatePartialPaseo } from "../schemas/paseo.js"

export class PaseoController {
    static async getAllInfo(req, res) {
        const allInfo = await PaseoModel.getAllInfo()
        if (allInfo.length === 0) return res.status(404).json({ ok: false, message: 'Not info found' })

        res.json({ ok: true, data: allInfo })
    }

    static async savePerson(req, res) {
        const result = validatePaseo(req.body)
        if (result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })

        const newPerson = await PaseoModel.savePerson({ input: result.data })
        res.status(201).json(newPerson)
    }

    static async updateInfo(req, res) {
        const result = validatePartialPaseo(req.body)
        if (result.error) return res.status(404).json({ message: JSON.parse(result.error.message) })
        
        const { id } = req.params
        const updatedPerson = await PaseoModel.updateInfo({ id, input: result.data })

        if (updatedPerson === false) return res.status(404).json({ message: 'Person not found' })
        
        return res.json(updatedPerson)
    }

    static async deletePerson(req, res) {
        const { id } = req.params
        const deletedPerson = await PaseoModel.deletePerson({ id })

        if (deletedPerson === false) return res.status(404).json({ message: 'Person not found' })

        return res.json(deletedPerson)
    }
}