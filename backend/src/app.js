import express from 'express'
import { paseoRouter } from './routes/paseo.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/paseo', paseoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})