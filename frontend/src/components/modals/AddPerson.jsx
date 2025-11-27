import { useRef, useState } from 'react'
import '../../styles/modals/AddPerson.css'
import { useAddPerson } from '../../hooks/modals/useAddPerson.js'
import { useInfo } from '../../hooks/useInfo.js'
import { getAllInfo } from '../../../services/getAllInfo.js'
export function AddPerson({ data }) {

    const [formData, setFormData] = useState({
        pernom: data?.pernom || '',
        percel: data?.percel || '',
        perbus: data?.perbus || '1',
        pervalpagar: parseInt(data?.pervalpagar) || 293000,
        pervalpagado: parseInt(data?.pervalpagado) || 0,
        perestado: data?.perestado || 'N'
    })

    const inputRefValpagar = useRef(null)
    const selectRefEstado = useRef(null)

    const { closeModal } = useAddPerson()
    const { setAllInfo } = useInfo()

    const handleSubmit = async (e) => {
        e.preventDefault()
        closeModal()
        await fetch('https://paseo-pagos.up.railway.app/paseo' + (data ? '/' + data.perid : ''), {
            method: data ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        getAllInfo(setAllInfo)
    }

    const handleChangeData = (e) => {
        const { name, value } = e.target
        if (name === 'perbus' && value === '1') {
            setFormData({
                ...formData,
                pervalpagar: 293000,
                perbus: '1'
            })
            inputRefValpagar.current.value = 293000
        } else if (name === 'perbus' && value === '0') {
            setFormData({
                ...formData,
                pervalpagar: 223000,
                perbus: '0'
            })
            inputRefValpagar.current.value = 223000
        }

        if (name === 'pervalpagado') {
            setFormData({
                ...formData,
                pervalpagado: parseInt(value),
                perestado: (value === inputRefValpagar.current.value) ? 'T' : (value === '' || parseInt(value) === 0) ? 'N' : 'F'
            })
        }

        if (name !== 'perbus' && name !== 'perestado' && name !== 'pervalpagado') {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    return (
        <div className="modal-addPerson">
            <h1>Agregar persona</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pernom">Nombre:</label>
                <input type="text" id="pernom" name="pernom" value={formData.pernom} onChange={handleChangeData} />

                <label htmlFor="percel">Celular:</label>
                <input type="text" id="percel" name="percel" value={formData.percel} onChange={handleChangeData} />

                <label htmlFor="perbus">Transporte:</label>
                <select id="perbus" name="perbus" onChange={handleChangeData} value={formData.perbus}>
                    <option value="1" selected>Si necesita transporte</option>
                    <option value="0">No necesita transporte</option>
                </select>

                <label htmlFor="pervalpagar">Valor a pagar:</label>
                <input ref={inputRefValpagar} value={formData.pervalpagar} type="number" id="pervalpagar" name="pervalpagar" disabled />

                <label htmlFor="pervalpagado">Valor pagado:</label>
                <input type="number" id="pervalpagado" value={formData.pervalpagado} name="pervalpagado" onChange={handleChangeData} />

                <label htmlFor="perestado">Estado:</label>
                <select ref={selectRefEstado} id="perestado" value={formData.perestado} name="perestado" disabled>
                    <option value="T">Pago todo</option>
                    <option value="F">Falta entregar dinero</option>
                    <option value="N">No ha pagado nada</option>
                </select>

                <button type="submit">{data ? 'Aceptar cambios' : 'Agregar'}</button>
            </form>
        </div>
    )
}