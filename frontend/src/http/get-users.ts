export const getUsers = async (usertype?: string, except?: string) => {
    if (usertype) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user?usertype=${usertype}`)
        const { users } = await response.json()
        return users
    }
    if (except) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user?except=${except}`)
        const { users } = await response.json()
        return users
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`)

    const { users } = await response.json()
    return users
}