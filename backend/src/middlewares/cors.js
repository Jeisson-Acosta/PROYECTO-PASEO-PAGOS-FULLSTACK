import cors from 'cors'

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'https://paseo-pagos.up.railway.app/paseo'
        ]

        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
})