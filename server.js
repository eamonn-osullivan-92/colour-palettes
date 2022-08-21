const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const router = require('./routes')
const path = require('path')
const utils = require('./utils')
const db = require('./db/index')

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
	db.getPalettes()
		.then((palettes) => {
			let parsedColors = utils.parseColors(palettes)
			let heroPalette = parsedColors[utils.randomNum(parsedColors)]
			res.render('home', heroPalette)
		})
		.catch((err) => {
			console.log(err)
			res.send('No good my friend.' + err.message)
		})
})

module.exports = server
