const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 5001
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/', require('./routes/ClipRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))