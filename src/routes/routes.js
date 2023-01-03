const tagus = require('../services/tagus.js')
const hades = require('../services/hades.js')
const atlantic = require('../services/atlantic.js')

module.exports = function (app) {

    app.delete('/user', async (req, res) => {
        const responseGetUser = await tagus.getUserByEmail(req.query.email)
        if ((JSON.stringify(JSON.parse(responseGetUser).results)) != '[]') {
            var user_id = JSON.parse(responseGetUser).results[0].id;
            const responseGetOrder = await tagus.getOrderByUserId(user_id)
            if ((JSON.stringify(JSON.parse(responseGetOrder))) != '[]') {
                order_id = JSON.parse(responseGetOrder)[0].id;
                const responseCancelPlan = await atlantic.cancelUserPlanByOrderId(order_id)
                if (responseCancelPlan != 204) {
                    return res.status(400).send("Error deleting user plan :(")
                }
            }
            const responseDeleteUser = await tagus.deleteUserById(user_id)
            if (responseDeleteUser != 204) {
                return res.status(400).send(`"Error deleting user ${req.query.email} :("`)
            }
            const responseGetEligibility = await hades.getEligibilityByEmail(req.query.email)
            if (responseGetEligibility == 404) {
                return res.status(200).send("User deleted!")
            }
            else {
                let eligible_member_id = JSON.parse(responseGetEligibility).eligible_member_id
                const responseDeleteEligibility = await hades.deleteElegibleMember(eligible_member_id)
                return res.status(200).send("User deleted!")
            }
        } else {
            const responseGetEligibility = await hades.getEligibilityByEmail(req.query.email)
            if (responseGetEligibility == 404) {
                return res.status(404).send("User not found")
            }
            else {
                let eligible_member_id = JSON.parse(responseGetEligibility).eligible_member_id
                const responseDeleteEligibility = await hades.deleteElegibleMember(eligible_member_id)
                return res.status(200).send("User deleted!")
            }
        }
    }),
    app.post('/user/plan', async (req, res) => {
        


        const responseGetUser = await tagus.getUserByEmail(req.query.email)
        if ((JSON.stringify(JSON.parse(responseGetUser).results)) != '[]') {
            var user_id = JSON.parse(responseGetUser).results[0].id;
            const responseGetOrder = await tagus.getOrderByUserId(user_id)
            if ((JSON.stringify(JSON.parse(responseGetOrder))) != '[]') {
                order_id = JSON.parse(responseGetOrder)[0].id;
                const responseCancelPlan = await atlantic.cancelUserPlanByOrderId(order_id)
                if (responseCancelPlan != 204) {
                    return res.status(400).send("Error deleting user plan :(")
                }
            }
            const responseDeleteUser = await tagus.deleteUserById(user_id)
            if (responseDeleteUser != 204) {
                return res.status(400).send(`"Error deleting user ${req.query.email} :("`)
            }
            const responseGetEligibility = await hades.getEligibilityByEmail(req.query.email)
            if (responseGetEligibility == 404) {
                return res.status(200).send("User deleted!")
            }
            else {
                let eligible_member_id = JSON.parse(responseGetEligibility).eligible_member_id
                const responseDeleteEligibility = await hades.deleteElegibleMember(eligible_member_id)
                return res.status(200).send("User deleted!")
            }
        } else {
            const responseGetEligibility = await hades.getEligibilityByEmail(req.query.email)
            if (responseGetEligibility == 404) {
                return res.status(404).send("User not found")
            }
            else {
                let eligible_member_id = JSON.parse(responseGetEligibility).eligible_member_id
                const responseDeleteEligibility = await hades.deleteElegibleMember(eligible_member_id)
                return res.status(200).send("User deleted!")
            }
        }
    })
}