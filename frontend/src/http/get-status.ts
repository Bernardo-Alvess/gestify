export const getStatus = async (token: string, id: string) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/status/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { status } = await response.json()
    console.log(status)
    return status
}