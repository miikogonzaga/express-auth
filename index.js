const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const router = require('./router')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI);

// App Setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const port = process.env.PORT || 8000
const server = http.createServer(app)
server.listen(port)
