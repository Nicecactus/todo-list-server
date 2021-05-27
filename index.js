const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const packg = require('./package.json')
const swaggerConfig = require('./swagger.json')
const userController = require('./src/UserController')
const app = express()
const port = 7060

swaggerConfig.definition.info['version'] = packg.version
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)))

app.use(express.json())
app.use(cors())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use('/', userController)

app.listen(port, () => {
  console.log(`ToDo list app listening at http://localhost:${port}`)
})
