interface IServiceOrder {
    description?: string
    defect?: string
    report?: string
    extras?: string
    status: string
    number?: string
    userId: string
    clientId?: string | undefined
    technicianId?: string | undefined
    date: Date | undefined | string
}

export const createSo = async (token: string, data: IServiceOrder): Promise<string | undefined> => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })


    if (response.ok) {
        const { id } = await response.json();
        return id
    }

    return undefined
}