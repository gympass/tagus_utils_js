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
        return JSON.stringify(data)
    } catch (error) {
        if (error.response.status == 404) {
            return error.response.status
        }
        else {
            console.error(error.message)
        }
    };
}

async function addElegibleMember(eligible_item_id, email_user, name) {

    const url = process.env.HADES_URL + `/v2/clients/${process.env.CLIENT_ID}/eligible-members`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.HADES_TOKEN
        },
        json: {
            "eligible_item_id": eligible_item_id,
            "email": email_user,
            "full_name": name
        }
    }
    // const body = {
    //     "eligible_item_id": eligible_item_id,
    //     "email": email_user,
    //     "full_name": name
    // }
    try {
        const { data } = await axios.post(url, config)
        return JSON.stringify(data)
    } catch (error) {
        console.error(error.message)
    };
}

async function deleteElegibleMember(eligible_member_id) {

    const url = process.env.HADES_URL + `/v1/clients/${process.env.CLIENT_ID}/eligible-members/${eligible_member_id}`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.HADES_TOKEN
        }
    }
    try {
        const resp = await axios.delete(url, config)
        return resp.status
    } catch (error) {
        console.error(error.message)
    };
}

module.exports = {
    getEligibilityByEmail,
    deleteElegibleMember,
    addElegibleMember,
}