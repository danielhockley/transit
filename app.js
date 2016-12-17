// Express
var express = require('express')
var app = express()

// Other packages
var request = require('request')
var nunjucks = require('nunjucks')

// Set up nunjucks
nunjucks.configure('views', {
	autoescape: true,
	express: app
})
app.set('view engine', nunjucks)

// Routes
var routes = require('./src/routes.js')

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

app.use('/', routes)

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