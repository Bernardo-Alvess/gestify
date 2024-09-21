interface ILoginData {
    email: string,
    password: string
}

export const login = async ({ email, password }: ILoginData) => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/login`)
    // const {id, token} = await response.json()
    // return {id, token}

    return { id: 'beecb49a-ae75-41f7-8482-43b723ce0ce4', token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNjk0ODA1NiwiaWF0IjoxNzI2OTQ4MDU2fQ.cEcWtXXu92WdGuPFTHBATKNrjVp5BlatKSbiHUn3Cv0' }
}