const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./src/router/router')
const errorMiddleware = require('./src/middlewares/error-middleware')
const app = express()
const PORT = process.env.PORT || 5000

console.log(process.env.CLIENT_URL)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log('Сервер запустился на ' + PORT + ' порту'))
    } catch (e) {
        console.log(e)
    }
}

start()