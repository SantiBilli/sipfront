export const fotoPerfil = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    const response = await fetch("http://localhost:3500/api/foto-perfil", {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;

    return response.json()
}