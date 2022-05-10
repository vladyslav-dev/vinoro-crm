require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRouter = require('./routes/auth')
const catalogRouter = require('./routes/catalog')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const dashboardRouter = require('./routes/dashboard')
const orderRouter = require('./routes/order')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api', dashboardRouter)
app.use('/api', categoryRouter)
app.use('/api', catalogRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter)
app.use('/api', authRouter)

app.use(errorMiddleware)

const start = async () => {
    try {

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => console.log('Server has been started on PORT ', PORT))

    } catch (err) {
        console.error(err)
    }
}


start()

