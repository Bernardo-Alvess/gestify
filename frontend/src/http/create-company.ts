interface ICreateCompanyData {
    cnpj: string,
    corporateReason: string,
    name: string,
    email: string,
    password: string,
}

export const createCompany = async (data: ICreateCompanyData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const { created } = await response.json()

    return { created }
}