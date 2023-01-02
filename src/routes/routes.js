const tagus = require('../services/tagus.js')
const hades = require('../services/hades.js')


module.exports = function (app) {

    app.get('/users', async (req, res) => {

        // const resp = await tagus.getUserByEmail(req.query.email)
        // if ((JSON.stringify(JSON.parse(resp).results)) != '[]') {
        //     var id = JSON.parse(resp).results[0].id;
        //     return res.status(200).send(resp)
        // }
        // else {
        //     return res.status(404).send("User not found")
        // }

        const resp = await hades.getEligibilityByEmail(req.query.email)
        // console.log("teste " + resp )
        // // return res.status(200).send(resp)
        // if (resp != 'undefined') {
        //     var id = JSON.parse(resp).results[0].id;
        //     return res.status(200).send(resp)
        // }
        // else {
        //     return res.status(404).send("User not found")
        // }
    })

}