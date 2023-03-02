require('dotenv').config()
const axios = require('axios')

const base_url = process.env.CHECKOUT_URL
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity'
    }
}

module.exports = {
    async checkoutPlan(signed_payload) {

        const url = base_url + `/checkout`

        let body = {
            "signed_payload": signed_payload,
            "source": "TAGUS_USER",
            "request_date": new Date().toISOString(),
            "payment_method": {
                "payment_method_type": "CREDIT_CARD",
                "encrypted_card_data": "PrZ3aMDvfJ6JRYXda4/teCLXO5eGYC2wYbPa5YQyXE48rO+Z+OrsedmrGEkD6vOcjvC9/XVoJCklSvJsogFmqM2ABn15wSbY8mm9OUlZ3lXbIe6HpEkcUzQMNYI1Ae9BKA9nj49uRFBt+AVgeCLiK0zQyMFsk0EQ5AScpogNz7nHERfzzuVIZDfybwwiLGD1z50Cf92nEjm8g2CsI0WQeyfvm/YLhmnJ+kB+DvmG4gr6VW8hZMRlLM+50zL1FlEJYI2Y0ad0Zh2Mk5SKZbGuA5VXNYdIkLwUKYqs+hiwEqsGnzkOCa1mEqZbxYoafcGkGQicGffHuXH2ZvfI8W/Fnw==",
                "account_holder": "TEST AUTOMATION",
                "card_display": "***********002",
                "expiry_month": "03",
                "expiry_year": "2030"
            }
        }
        console.log(body)
        try {
            await axios.post(url, body, config)
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
