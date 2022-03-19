require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')

const authRouter = require('./routes/auth')
const catalogRouter = require('./routes/catalog')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', authRouter)
app.use('/api', catalogRouter)

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log('Server has been started on PORT ', PORT))
    } catch (err) {

    }
}

start()