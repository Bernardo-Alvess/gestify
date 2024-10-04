export const getUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`)

    const { users } = await response.json()
    return users
}