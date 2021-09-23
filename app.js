require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const router = require('./routers')

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', err => {
    console.log('connection error:', err)
})
db.once('open', () => {
    console.log('database connected')
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json('BEM KM IPB API ')
})
app.use(router)

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})
