const fetch = require('node-fetch')

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

async function fetchRandomPalette() {
	let colors = await fetch('http://colormind.io/api/', {
		method: 'POST',
		body: JSON.stringify({ model: 'ui' }),
	})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			let colors = rgbArraytoHexArray(response.result)
			return { colors }
		})
	return colors
}

// user selects a start and end color and colormind will fill the gaps with like colors. i.e. user supplies color 1 and 5, colormind provides color 2, 3, 4

async function fetchTargetedPalette(color1, color2) {
	// takes in two colours
}

module.exports = {
	fetchRandomPalette,
	randomNum,
}
