require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})
app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
		tokens.body(req, res)
	].join(' ')
}))

app.get('/api/persons', (request, response) => {
	Person.find({})
		.then(result => {
			response.json(result)
		})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => {
			response.json(person)
		})
		.catch(error => {
			console.log(error)
			response.status(404).end()
		})
})

app.get('/info', (request, response) => {
	response.send(
		'<p>Phonebook has info for 4 people</p>' +
		`<p>${new Date()}</p>`
	)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	Person.findByIdAndRemove(id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => {
			console.log('how', error)
		})
})

app.post('/api/persons', (request, response) => {
	const body = request.body;
	person = new Person({
		name: body.name,
		number: body.number
	})
	person.save()
		.then(result => {
			response.json(result)
		})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
