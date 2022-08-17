const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const router = require('./routes')
const path = require('path')
const utils = require('./utils')

const server = express()

// SERVER CONFIGURATION
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))

// HANDLEBARS CONFIGURATION
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

//Routes

server.use('/', router)

server.get('/', (req, res) => {
	fs.readFile('./data.json', 'utf-8', (err, data) => {
		if (err) return res.status(500).send(err.message)
		let parsed = JSON.parse(data)
		let heroPalette = parsed.palettes[utils.randomNum(parsed.palettes)]
		res.render('home', heroPalette)
	})
})

module.exports = server
