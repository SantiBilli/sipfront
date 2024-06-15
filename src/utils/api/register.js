//http://localhost:3500/api/register
//https://sipback-production.up.railway.app/api/register

export const sendRegisterForm = async (credentials) => {
    const response = await fetch("https://sipback-production.up.railway.app/api/register", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    })

    if (response.status == 501) return false;

    return true
}