require('dotenv').config()
const axios = require('axios')

async function getEligibilityByEmail(email_user) {

    const params = new URLSearchParams({ client_id: process.env.CLIENT_ID, email: email_user })
    const url = process.env.HADES_URL + `/v1/eligibility/match?${params.toString()}`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.HADES_TOKEN
        }
    }
    try {
        const { data } = await axios.get(url, config)
        console.log("teste " + data )
        console.log(JSON.stringify(data))
        return JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getEligibilityByEmail,
}