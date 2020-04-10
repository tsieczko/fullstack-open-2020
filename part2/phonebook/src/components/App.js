import React, {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNewFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const handleNewNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}
		else {
			setPersons(persons.concat({
				name: newName,
				number: newNumber
			}))
			setNewName('')
			setNewNumber('')
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input value={filter} onChange={handleNewFilterChange}/>
			</div>
			<h2>add a new</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNewNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNewNumberChange}/>
				</div>
				<div>
					<button type='submit' onClick={addPerson}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => {
				if (person.name.toLowerCase().includes(filter.toLowerCase()))
					return <div key={person.name}>{person.name} {person.number}</div>
				else
					return null
			})}
		</div>
	)
}

export default App
