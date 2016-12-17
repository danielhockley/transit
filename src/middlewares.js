// Express
var express = require('express')
var app = express()

// Other packages
var request = require('request')

module.exports = {
	getData: function(req, res, next) {
		var operators = request('https://transit.land/api/v1/operators', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.locals.operators = JSON.parse(body)
				next()
			}
		}).on('error', function(err) {
	    	console.log(err)
		})
	}
}