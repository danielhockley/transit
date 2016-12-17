var express = require('express')
var request = require('request')

var router = express.Router()

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

module.exports = router;