require('dotenv').config()
const axios = require('axios')

async function generateToken(email_user) {

    const url = process.env.SIGNUP_URL + `/generate-token`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        json: {
            "client_id": process.env.CLIENT_ID,
            "country_name": "BR",
            "language": "pt-br",
            "email": email_user
        }
    }
    try {
        const { data } = await axios.post(url, config)
        return JSON.stringify(data)
    } catch (error) {
        console.error(error.message)
    };
}

async function signupMember(email_user, seed, code, name, password, eligibility_id) {

    const url = process.env.SIGNUP_URL + `/member`
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        json: {
            "client_id": process.env.CLIENT_ID,
            "country_name": "BR",
            "language": "pt-br",
            "email": email_user,
            "seed": seed,
            "token": code,
            "full_name": name,
            "password": password,
            "legal_docs": [
                {
                    "doc_type": "TERMS_AND_CONDITIONS",
                    "country_id": "BR",
                    "version": "F79zzEvwqqVy0ox5UHAcb_m075FUSy00"
                }
            ],
            "eligibility_id": eligibility_id
        }
    }
    try {
        const { data } = await axios.post(url, config)
        return JSON.stringify(data)
    } catch (error) {
        console.error(error.message)
    };
}

module.exports = {
    generateToken,
    signupMember,
}