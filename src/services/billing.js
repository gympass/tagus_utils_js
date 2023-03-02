require('dotenv').config()
const axios = require('axios')

const base_url = process.env.BILLING_CALCULATOR_URL
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity'
    }
}

module.exports = {
    async associatePlan(id_user, plan) {

        const url = base_url + `/calculate`
        let basic = [{
            "amount": "999",
            "currency": "BRL",
            "country": "BR",
            "free_trial_days": 7,
            "user_id": id_user,
            "plan_id": "450b298b-6e91-4337-9357-e456c3e8515a",
            "offer_plan_id": "2cba1754-c86e-4672-ae7c-dc5f620f5dba",
            "offer_id": "beccbbaf-d26d-4608-a547-512581dee076",
            "eligible_id": "8a232634-63c2-4886-95d0-4f49996fae36",
            "eligibility_group_id": "068dbc79-bf78-4c0b-bdd5-212f8c4f6718"
        }]
        let diamond = [{
            "amount": "999",
            "currency": "BRL",
            "country": "BR",
            "free_trial_days": 7,
            "user_id": id_user,
            "plan_id": "929de5c8-62ad-4a3f-bb02-15f5564fc19f",
            "offer_plan_id": "f02a1483-857e-4a55-87fb-31cd4303e86b",
            "offer_id": "beccbbaf-d26d-4608-a547-512581dee076",
            "eligible_id": "a077b4d0-abe1-4fb4-bda8-6ae26614592b",
            "eligibility_group_id": "068dbc79-bf78-4c0b-bdd5-212f8c4f6718"
        }]
        if (plan == "Basic") {
            var body = basic
        } else {
            var body = diamond
        }
        try {
            const { data } = await axios.post(url, body, config)
            return data[0].signed_payload
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
