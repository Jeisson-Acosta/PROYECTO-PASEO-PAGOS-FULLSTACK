import mysql from 'mysql2/promise'

// Configuración por defecto de la APP
const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '',
    database: 'paseoFamilia'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class PaseoModel {
    static async getAllInfo() {

        const [allInfo] = await connection.query(
            'CALL sp_getAllInfo();'
        )

        if (allInfo[0].length === 0) return []

        return allInfo[0]
    }

    static async savePerson({ input }) {
        const {
            pernom,
            percel,
            pervalpagar,
            pervalpagado,
            perbus,
            perestado
        } = input

        try {
            const [person] = await connection.query(
                'CALL sp_savePerson(?, ?, ?, ?, ?, ?);',[pernom, percel, pervalpagar, pervalpagado, perbus, perestado]
            )

            if (person[0].length === 0) return []
            return person[0]
            
        } catch(err) {
            throw new Error('Error creating person in the DB')
        }
    }

    static async updateInfo({ id, input }) {
        const [personToUpdate] = await connection.query(
            'SELECT * FROM tbl_persona WHERE perid = ?;',
            [id]
        )

        if (personToUpdate.length === 0) return false

        const fields = Object.keys(input).map(key => `${key} = ?`).join(', ')
        const values = Object.values(input)
        values.push(id)

        await connection.query(
            `UPDATE tbl_persona SET ${fields} WHERE perid = ?;`,
            values
        )

        const [personUpdated] = await connection.query(
            `SELECT * FROM tbl_persona WHERE perid = ?;`,
            [id]
        )

        return personUpdated
    }

    static async deletePerson({ id }) {
        const [personToDelete] = await connection.query(
            'SELECT * FROM tbl_persona WHERE perid = ?;',
            [id]
        )

        if (personToDelete.length === 0) return false

        await connection.query(
            'DELETE FROM tbl_persona WHERE perid = ?;',
            [id]
        )

        return true
    }
}