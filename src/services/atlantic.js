require('dotenv').config()
const axios = require('axios')

const base_url = process.env.ATLANTIC_URL
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
        'Authorization': process.env.ATLANTIC_TOKEN
    }
}

module.exports = {
    async cancelUserPlanByOrderId(order_id) {

        const url = base_url + `/v1/user-orders/${order_id}/cancel`

        try {
            await axios.post(url, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
