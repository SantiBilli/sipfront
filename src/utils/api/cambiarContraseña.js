export const cambiarContraseñaForm = async (credentials) => {
    // console.log(credentials)
    const response = await fetch(`http://localhost:3500/api/cambiar-contrasena/${credentials.userId}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorization":`Bearer ${credentials.token}`},
    })

    if (response.status == 501) return false;

    return true
}