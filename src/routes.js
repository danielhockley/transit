var express = require('express')
var request = require('request')

var router = express.Router()

// Root route
// Load a nunjucks template and list out all transit operators loaded from the transit.land API
router.get('/', function(req, res) {
	
	var operators = res.locals.operators.operators
	var listOperators = []
	var operator
	
	// Create smaller operators object to pass to template
	for (var i=0; i<Object.keys(operators).length; i++){
		operator = operators[i].name
		listOperators[i] = {
			id : i,
			name : operators[i].name,
		}
	}

	console.log(listOperators)
	
	// Render template
	res.render("index.html", {
		title : "List of Transit Providers",
		listOperators : listOperators
	})
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