const express = require('express')
const app = express()

let persons = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const foundPerson = persons.find(person => person.id == id)
	console.log(foundPerson);
	if (foundPerson) {
		response.json(foundPerson)
	} else {
		response.status(404).end()
	}
})

app.get('/info', (request, response) => {
	response.send(
		'<p>Phonebook has info for 4 people</p>' +
		`<p>${new Date()}</p>`
	)
})

app.listen(3001, () => {
	console.log('Server running on port 3001')
})