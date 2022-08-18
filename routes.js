const express = require('express')
const router = express.Router()
const db = require('./db/index')
const utils = require('./utils')
const fetch = require('node-fetch')

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

// non async version
router.get('/generate', (req, res) => {
	utils
		.fetchRandomPalette()
		.then((palette) => {
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

// TODO
// delete
// update
// built in color picker (react, bootstrap, other library or module.)

module.exports = router
