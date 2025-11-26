import z from 'zod'

const paseoSchema = z.object({
    pernom: z.string({ error: 'Name of the person is required' }),
    percel: z.string({ error: 'Thelephone of the person is required' }),
    pervalpagar: z.number({ error: 'Price of the person is required, pervalpagar' }),
    pervalpagado: z.number({ error: 'Price of the person is required, pervalpagado' }),
    perbus: z.enum(['1', '0'], { error: 'Transport of the person is required' }),
    perestado: z.enum(['T', 'F', 'N'], { error: 'State of the person is required' })
})

export function validatePaseo(object) {
    return paseoSchema.safeParse(object)
}

export function validatePartialPaseo(object) {
    return paseoSchema.partial().safeParse(object)
}