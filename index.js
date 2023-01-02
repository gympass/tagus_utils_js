const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger_output.json')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(3000, () => {
    console.log("Server is running!\nAPI documentation: http://localhost:3000/api-doc")
})

require('./src/routes/routes')(app)