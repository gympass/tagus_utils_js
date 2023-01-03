require('dotenv').config()
const axios = require('axios')

async function cancelUserPlanByOrderId(order_id) {

    const url = process.env.TAGUS_URL + `/v1/users/${order_id}/cancel`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': process.env.TAGUS_TOKEN
        }
    }
    try {
        const resp = await axios.post(url, config)
        return resp.status
    } catch (error) {
        if (error.response.status == 400 || error.response.status == 404) {
            return error.response.status = 204
        }
        else {
            console.error(error.message)
        }
    };
}

module.exports = {
    cancelUserPlanByOrderId,
}