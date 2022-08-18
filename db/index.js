const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

function getPalettes(db = conn) {
	return db('palettes').select()
}

function addPalette(array, db = conn) {
	return db('palettes').insert({
		colors: JSON.stringify(array),
	})
}

module.exports = { getPalettes, addPalette }
