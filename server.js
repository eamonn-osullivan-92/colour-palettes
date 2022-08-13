const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const path = require('path')

const server = express()

// SERVER CONFIGURATION
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))

// HANDLEBARS CONFIGURATION
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

//Routes

server.get('/', (req, res) => {
	res.send('hello world')
})

module.exports = server
