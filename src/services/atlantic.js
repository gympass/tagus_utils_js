require('dotenv').config()
const axios = require('axios')

const base_url = process.env.TAGUS_URL
const config = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': process.env.TAGUS_TOKEN
    }
}

module.exports = {
    async cancelUserPlanByOrderId(order_id) {

        const url = base_url + `/v1/users/${order_id}/cancel`

        try {
            await axios.post(url, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
