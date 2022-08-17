const express = require('express')
const router = express.Router()
const fs = require('fs')

const utils = require('./utils')

router.get('/palettes', (req, res) => {
	fs.readFile('./data.json', 'utf-8', (err, data) => {
		if (err) return res.status(500).send(err.message)
		let parsed = JSON.parse(data)
		res.render('palettes', parsed)
	})
})

router.get('/generate', async (req, res) => {
	let palette = await utils.fetchRandomPalette()

	// palette is not awaiting
	res.render('generate', palette)
})

module.exports = router
