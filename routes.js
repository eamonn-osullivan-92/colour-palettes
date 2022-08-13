const express = require('express')
const router = express.Router()
const fs = require('fs')
const fetch = require('node-fetch')

router.get('/palettes', (req, res) => {
	fs.readFile('./data.json', 'utf-8', (err, data) => {
		if (err) return res.status(500).send(err.message)
		let parsed = JSON.parse(data)
		res.render('palettes', parsed)
	})
})

router.get('/generate', async (req, res) => {
	let palette = await fetchColors()

	// palette is not awaiting
	res.render('generate', palette)
})

// utils

function randomNum(array) {
	return Math.floor(Math.random() * array.length)
}

function componentToHex(c) {
	let hex = c.toString(16).toUpperCase()
	return hex.length == 1 ? '0' + hex : hex
}

function rgbToHex(r, g, b) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function rgbArraytoHexArray(array) {
	let colorOne = rgbToHex(array[0][0], array[0][1], array[0][2])
	let colorTwo = rgbToHex(array[1][0], array[1][1], array[1][2])
	let colorThree = rgbToHex(array[2][0], array[2][1], array[2][2])
	let colorFour = rgbToHex(array[3][0], array[3][1], array[3][2])
	let colorFive = rgbToHex(array[4][0], array[4][1], array[4][2])

	return [colorOne, colorTwo, colorThree, colorFour, colorFive]
}

async function fetchColors() {
	let colors = await fetch('http://colormind.io/api/', {
		method: 'POST',
		body: JSON.stringify({ model: 'default' }),
	})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			console.log(response)
			let colors = rgbArraytoHexArray(response.result)
			console.log({ colors })
			return { colors }
		})
	return colors
}

module.exports = router
