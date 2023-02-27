import express from 'express'
const dotenv = require('dotenv').config()
import errorMiddleware from './middleware/errorMiddleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./modules/users/routes'))
app.use('/', require('./modules/tasks/routes'))
app.use('/', require('./modules/roles/routes'))
app.use('/', require('./modules/priorities/routes'))
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000

app.listen(process.env.PORT, () => { console.log(`Server running on port ${PORT}`) })
