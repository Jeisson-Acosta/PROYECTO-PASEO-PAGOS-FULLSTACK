export const getAllInfo = async (setAllInfo) => {
    const response = await fetch('http://localhost:3000/paseo')
    const data = await response.json()
    setAllInfo(data)
}