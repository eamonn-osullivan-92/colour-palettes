const server = require('./server.js')

const port = process.env.PORT || 3000

server.listen(port, function () {
	console.log('server is listening on port ', port)
})
