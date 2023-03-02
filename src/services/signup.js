require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')

const base_url = process.env.SIGNUP_URL
let uuid = uuidv4()
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
        'x-gympass-correlation-id': uuid
    }
}

module.exports = {
    async generateToken(email_user) {

        const url = base_url + `/generate-token`

        let body = {
            "client_id": process.env.CLIENT_ID,
            "country_name": "BR",
            "language": "pt-br",
            "email": email_user
        }
        try {
            const { data } = await axios.post(url, body, config)
            return data.seed
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    },

    async signupMember(email_user, seed, code, eligibility_id) {

        const url = base_url + `/member`

        let body = {
            "client_id": process.env.CLIENT_ID,
            "country_name": "BR",
            "language": "pt-br",
            "email": email_user,
            "seed": seed,
            "token": code,
            "full_name": process.env.DEFAULT_NAME,
            "password": process.env.DEFAULT_PASS,
            "legal_docs": [
                {
                    "doc_type": "TERMS_AND_CONDITIONS",
                    "country_id": "BR",
                    "version": "F79zzEvwqqVy0ox5UHAcb_m075FUSy00"
                }
            ],
            "eligibility_id": eligibility_id
        }
        try {
            const { data } = await axios.post(url, body, config)
            return data.user_id
        } catch (error) {
            console.log(`Error call url - ${url} Message - ${error}`)
            throw new Error('Error', error)
        }
    }
}
