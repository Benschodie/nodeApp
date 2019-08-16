const express = require('express')
const app = express()

const router = require('./router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

// exportiert app.js damit andere files darauf zugreifen können
module.exports = app