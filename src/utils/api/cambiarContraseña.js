export const cambiarContraseñaForm = async (credentials) => {
    // console.log(credentials.userId)
    const response = await fetch(`http://localhost:3500/api/olvide-contrasena/${credentials.userId}`, {
        method: "GET",
        mode: "cors",
    })

    if (response.status == 204) return false;

    return response.json()
}

export const cambiarContraseña = async (credentials) => {
    // console.log(credentials.userId)
    const response = await fetch(`http://localhost:3500/api/cambiar-contrasena`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${credentials.token}`},
        body: JSON.stringify(credentials.contra)
    })

    if (response.status == 204) return false;

    return response.json()
}