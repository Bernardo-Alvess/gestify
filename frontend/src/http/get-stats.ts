interface Stats {
    totalProducts: number;
    lowStockProductCount: number;
    lowStockProducts: [],
    totalClients: number;
    totalUsers: number;
    totalSo: number;
}

const getStats = async (token: string): Promise<Stats> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/home`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    return data
}

export { getStats }