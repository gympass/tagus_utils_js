require('dotenv').config()
const axios = require('axios')

const base_url = process.env.HADES_URL
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
        'Authorization': process.env.HADES_TOKEN
    }
}

module.exports = {
    async getEligibilityByEmail(email_user) {

        const params = new URLSearchParams({ client_id: process.env.CLIENT_ID, email: email_user })
        const url = base_url + `/v1/eligibility/match?${params.toString()}`

        try {
            const { data } = await axios.get(url, config)
            return data.eligible_member_id
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async addElegibleMember(eligible_item_id, email_user) {

        const url = base_url + `/v2/clients/${process.env.CLIENT_ID}/eligible-members`

        let body = {
            "eligible_item_id": eligible_item_id,
            "email": email_user,
            "full_name": process.env.DEFAULT_NAME
        }
        try {
            await axios.post(url, body, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async deleteElegibleMember(eligible_member_id) {

        const url = base_url + `/v1/clients/${process.env.CLIENT_ID}/eligible-members/${eligible_member_id}`

        try {
            await axios.delete(url, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
