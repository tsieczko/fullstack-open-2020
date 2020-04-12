import React, {useState, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import AppService from './services/AppService'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	useEffect(() => {
		AppService.getAll()
			.then(records => setPersons(records))
	}, [])

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
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}
		else {
			AppService.addPerson(newPerson)
				.then(addedPerson => {
					setPersons(persons.concat(addedPerson))
					setNewName('')
					setNewNumber('')
				})
		}
	}

	const deletePerson = (targetPerson) => (event) => {
		event.preventDefault()
		if (window.confirm(`Delete ${targetPerson.name}?`)) {
			AppService.deletePerson(targetPerson)
				.then(() => {
					setPersons(persons.filter(person => person !== targetPerson))
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange}/>
			<PersonForm
				newName={newName} handleNewNameChange={handleNewNameChange}
				newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}
				addPerson={addPerson}
			/>
			<Persons
				persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))}
				deletePerson={deletePerson}
			/>
		</div>
	)
}

export default App
