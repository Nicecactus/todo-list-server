const app = require('./src/app')

const port = 7060

app.listen(port, () => {
  console.log(`ToDo list app listening at http://localhost:${port}`)
})
