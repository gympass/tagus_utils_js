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
        console.error(error.message);
    }
}

async function getOrderByUserId(user_id) {

    const url = process.env.TAGUS_URL + `/v2/users/${user_id}/orders`
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
        console.error(error.message);
    }
}

async function deleteUserById(user_id) {

    const url = process.env.TAGUS_URL + `/v1/users/${user_id}`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.TAGUS_TOKEN
        }
    }
    try {
        const resp = await axios.delete(url, config)
        return resp.status;
    } catch (error) {
        console.error(error.message);
    }
}

async function getClientOrder() {

    const url = process.env.TAGUS_URL + `/v3/client-orders/client/${process.env.CLIENT_ID}`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.TAGUS_TOKEN
        }
    }
    try {
        const resp = await axios.get(url, config)
        return resp.status;
    } catch (error) {
        console.error(error.message);
    }
}

async function createEligibilities(eligible_member_id, eligibility_item_id) {

    const url = process.env.TAGUS_URL + `/v1/eligibilities`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.TAGUS_TOKEN
        },
        json: {
            "associate_eligibility_id": eligible_member_id,
            "eligibility_type": "ASSOCIATE",
            "eligible_item_id": eligibility_item_id
        }
    }
    try {
        const { data } = await axios.post(url, config)
        return JSON.stringify(data);
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = {
    getUserByEmail,
    getOrderByUserId,
    deleteUserById,
    getClientOrder,
    createEligibilities,
}