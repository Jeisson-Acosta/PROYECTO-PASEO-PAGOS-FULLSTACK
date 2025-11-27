export const getAllInfo = async (setAllInfo) => {
    const response = await fetch('https://paseo-pagos.up.railway.app/paseo')
    const data = await response.json()
    setAllInfo(data)
}