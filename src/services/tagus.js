require('dotenv').config()
const axios = require('axios')

async function getUserByEmail(email_user) {

    const params = new URLSearchParams({ email: email_user })
    const url = process.env.TAGUS_URL + `/v1/users?${params.toString()}`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.TAGUS_TOKEN
        }
    }
    try {
        const { data } = await axios.get(url, config)
        return JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getUserByEmail,
}