interface ILoginData {
    email: string,
    password: string
}

export const loginUser = async (data: ILoginData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    // const { id, token } = await response.json()
    // return { id, token }
    const { logged } = await response.json()
    return { logged }
}