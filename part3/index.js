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
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => {
			response.json(person)
		})
		.catch(error => next(error))
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
		.catch(error => next(error))
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
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name == 'CastError') {
		return response.status(400).send({
			error: 'malformatted id'
		})
	}

	next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'unknown endpoint'
	})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
