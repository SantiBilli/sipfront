export const cambiarContraseñaForm = async (credentials) => {
    // console.log(credentials.userId)
    const response = await fetch(`http://localhost:3500/api/olvide-contrasena/${credentials.userId}`, {
        method: "GET",
        mode: "cors",
    })

    if (response.status == 204) return false;

    return response.json()
}