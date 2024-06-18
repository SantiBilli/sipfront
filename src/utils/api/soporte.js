export const handleSoporte = async (formdata) => {
    const token = localStorage.getItem("userToken")
    if (!token) return

    console.log("Hola");

    const response = await fetch("http://localhost:3500/api/soporte", {
        method: "POST",
        mode: "cors",
        headers: {"Authorization":`Bearer ${token}`},
        body: formdata
    })

    if (response.status == 204) return 204;

    return true
}