interface ILoginData {
    email: string,
    password: string
}

export const login = async (data: ILoginData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const { id, token } = await response.json()
    return { id, token }
}