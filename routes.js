const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('./db/index')

const utils = require('./utils')

let currentPalette

router.get('/palettes', (req, res) => {
	db.getPalettes()
		.then((palettes) => {
			let parsedColors = utils.parseColors(palettes)
			res.render('palettes', { palettes: parsedColors })
		})
		.catch((err) => {
			console.log(err)
			res.send('Not good. ' + err.message)
		})
})

router.get('/generate', async (req, res) => {
	utils
		.fetchRandomPalette()
		.then((palette) => {
			currentPalette = palette
			res.render('generate', palette)
		})
		.catch((err) => {
			console.log(err)
			res.send('Not good. ' + err.message)
		})
})

// add color to palettes
router.post('/generate', (req, res) => {
	let colors = req.body
	let array = colors.colors.split(',')
	db.addPalette(array)
		.then(() => {
			res.redirect('/generate')
		})
		.catch((err) => {
			console.log(err)
			res.send('Not good. ' + err.message)
		})
})

module.exports = router
