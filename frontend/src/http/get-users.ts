export const getUsers = async (token: string, usertype?: string, except?: string) => {

    let url = `${import.meta.env.VITE_API_URL}/user`

    if (usertype) {
        url += `?usertype=${usertype}`
    } else if (except) {
        url += `?except=${except}`
    }

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { users } = await response.json()
    return users

    /**
     * ##TODO: testar pra ver se está funcionando ainda e realizar isto em outras repositories
     */

    // if (usertype) {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/user?usertype=${usertype}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }
    //     )
    //     const { users } = await response.json()
    //     return users
    // }
    // if (except) {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/user?except=${except}`)
    //     const { users } = await response.json()
    //     return users
    // }
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/user`)

    // const { users } = await response.json()
    // return users
}