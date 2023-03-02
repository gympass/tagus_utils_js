require('dotenv').config()
const axios = require('axios')

const base_url = process.env.TAGUS_URL;

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
        'Authorization': process.env.TAGUS_TOKEN
    }
};

module.exports = {

    async getIdUserByEmail(email_user) {

        const params = new URLSearchParams({ email: email_user })
        const url = base_url + `/v1/users?${params.toString()}`

        try {
            const { data } = await axios.get(url, config)
            return data.results[0].id;
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async getGympassIdByEmail(email_user) {

        const params = new URLSearchParams({ email: email_user })
        const url = base_url + `/v1/users?${params.toString()}`

        try {
            const { data } = await axios.get(url, config)
            return data.results[0].gympass_id;
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async getOrderByUserId(user_id) {

        const url = base_url + `/v2/users/${user_id}/orders`

        try {
            const { data } = await axios.get(url, config)
            return data[0].id;
        } catch (error) {
            if (error.status == 404) {
                return
            } else {
                console.log(`Error call url - ${url} Message - ${error}`)
                throw new Error('Error', error)
            }
        }
    },

    async deleteUserById(user_id) {

        const url = base_url + `/v1/users/${user_id}`

        try {
            await axios.delete(url, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async getClientOrder() {

        const url = base_url + `/v3/client-orders/client/${process.env.CLIENT_ID}`

        try {
            const { data } = await axios.get(url, config)
            return data.orders[0].order_items.recurring.payments[0].eligibles[0].id;
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async createEligibilities(eligible_member_id, eligibility_item_id) {

        const url = base_url + `/v1/eligibilities`

        let body = {
            "associate_eligibility_id": eligible_member_id,
            "eligibility_type": "ASSOCIATE",
            "eligible_item_id": eligibility_item_id
        }
        try {
            const { data } = await axios.post(url, body, config)
            return data.eligibility_id;
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },
};
