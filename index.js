const express = require('express')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const printQuote = require('./quote').printQuote

var apiURL = 'https://dvfmqijzho.localtunnel.me'
var count = 0

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('*', function(req, res, next) {
	count++
	console.log(count)
	next()
})

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.post('/', function (req, res) {
	console.log(req.body)
	res.send(req.body)
})

app.get('/quotes/', function (req, res) {
	var url = apiURL + '/quotes/*'
	request(url, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			var parsedBody = JSON.parse(body)
			var names = Object.keys(parsedBody)
			res.send(names)
			names.forEach(name => console.log(name))
		}
	})
})

app.get('/quotes/:name', function (req, res) {
	var url = apiURL + '/quotes/'
	var constructedURL = apiURL + req.params['name']

	request(constructedURL, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			var name = req.params['name']
			var parsedBody = JSON.parse(body)
			var quotes = parsedBody[name]

			var randomQuote = quotes[Math.floor(Math.random()*quotes.length)]

			var quote = printQuote(req.params['name'], randomQuote)
			res.send(quote)
		}
	})
})

app.listen(3000, function () {
	console.log('App listening on port 3000')
})
