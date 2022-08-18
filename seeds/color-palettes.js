const { json } = require('express')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('palettes').del()
	await knex('palettes').insert([
		{
			id: 1,
			colors: JSON.stringify([
				'#CCD5AE',
				'#E9EDC9',
				'#FEFAE0',
				'#FAEDCD',
				'#D4A373',
			]),
		},
		{
			id: 2,
			colors: JSON.stringify([
				'#F08080',
				'#F4978E',
				'#F8AD9D',
				'#FBC4AB',
				'#FFDAB9',
			]),
		},
		{
			id: 3,
			colors: JSON.stringify([
				'#736CED',
				'#9F9FED',
				'#D4C1EC',
				'#F2DFD7',
				'#FEF9FF',
			]),
		},
		{
			id: 4,
			colors: JSON.stringify([
				'#EDEEC9',
				'#DDE7C7',
				'#BFD8BD',
				'#98C9A3',
				'#77BFA3',
			]),
		},
		{
			id: 5,
			colors: JSON.stringify([
				'#F9DC5C',
				'#FAE588',
				'#FBEA9E',
				'#FCEFB4',
				'#FDF8E1',
			]),
		},
	])
}
