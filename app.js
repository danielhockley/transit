// Express
var express = require('express')
var app = express()

// Router
var router = express.Router()

// Other packages
var request = require('request')

// Root route
router.get('/', function(req, res) {
	
	var operators = res.locals.operators.operators
	
	for (var i=0; i<Object.keys(operators).length; i++){
		console.log(operators[i].name + '\n')
	}
	
	// Send to page
	res.type('application/javascript')
	res.send(operators)
})

// Route to spit out whole json object
router.get('/json', function(req, res) {
	
	var operators = res.locals.operators
	//console.log(operators)

	res.type('application/javascript')
	res.send(operators)
	//res.send('hello')
})

// Middleware to load data from transit.land
app.use('/', function(req, res, next) {
	var operators = request('https://transit.land/api/v1/operators', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.locals.operators = JSON.parse(body)
			next()
		}
	}).on('error', function(err) {
    	console.log(err)
  	})
})

app.use('/', router)

// 404
app.use(function(req, res) {
	res.type('text/html')
	res.status(404)
	res.send('404')
})

// Initialize app
app.listen(3000, function() {
	console.log('Start')
})