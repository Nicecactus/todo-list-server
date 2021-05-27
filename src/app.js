const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const packg = require('../package.json')
const swaggerConfig = require('../swagger.json')
const userController = require('./UserController')

const app = express()

swaggerConfig.definition.info['version'] = packg.version
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)))

app.use(express.json())
app.use(cors())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use('/', userController)

module.exports = app
