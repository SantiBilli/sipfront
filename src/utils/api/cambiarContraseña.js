export const cambiarContraseñaForm = async (credentials) => {
    // console.log(credentials.userId)
    const response = await fetch(`http://localhost:3500/api/olvide-contrasena-user`, {
        method: "GET",
        mode: "cors",
        headers: {"Authorization": `Bearer ${JSON.stringify(credentials.token)}`}
    })

    if (response.status == 204) return false;

    return response.json()
}

export const cambiarContraseña = async (credentials) => {

    const response = await fetch(`http://localhost:3500/api/cambiar-contrasena`, {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${JSON.stringify(credentials.token)}`},
        body: JSON.stringify({contra: credentials.contra})
    })

    if (response.status == 401) return 401;
    if (response.status == 204) return 204;

    return response.status
}