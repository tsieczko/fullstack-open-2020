import React, {useState} from 'react'

const Filter = (props) => {
	return (
		<div>
			filter shown with <input value={props.filter} onChange={props.handleFilterChange}/>
		</div>
	)
}

const PersonForm = (props) => {
	return(
		<form>
			<div>
				name: <input value={props.newName} onChange={props.handleNewNameChange} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.handleNewNumberChange}/>
			</div>
			<div>
				<button type='submit' onClick={props.addPerson}>add</button>
			</div>
		</form>
	)
}

const Persons = ({persons}) => {
	return (
		persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
	)
}

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

	const handleNewNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
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
			<Filter filter={filter} handleFilterChange={handleFilterChange}/>
			<h3>add a new</h3>
			<PersonForm
				newName={newName} handleNewNameChange={handleNewNameChange}
				newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}
				addPerson={addPerson}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))}/>
		</div>
	)
}

export default App
