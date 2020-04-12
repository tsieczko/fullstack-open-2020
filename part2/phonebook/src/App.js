import React, {useState, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import AppService from './services/AppService'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [notification, setNotification] = useState({
		message: null,
		error: false
	})

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
		if (persons.some(person => person.name === newName)) {
			const existingPerson = persons.find(person => person.name === newName)
			const updatedPerson = {
				...existingPerson,
				number: newNumber
			}
			AppService.updatePerson(updatedPerson)
				.then(updatedPerson => {
					setPersons(persons.map(person => {
						return person.name === updatedPerson.name
							? updatedPerson
							: person
					}))
					setNewName('')
					setNewNumber('')
					setNotification({
						message: `Updated number for ${updatedPerson.name}`,
						error: false
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
				.catch(addedPerson => {
					setNotification({
						message: `Failed to update ${updatedPerson.name}.`,
						error: true
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
		}
		else {
			AppService.addPerson({
				name: newName,
				number: newNumber
			})
				.then(addedPerson => {
					setPersons(persons.concat(addedPerson))
					setNewName('')
					setNewNumber('')
					setNotification({
						message: `Added ${addedPerson.name}`,
						error: false
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
				.catch(addedPerson => {
					setNotification({
						message: `Failed to add ${addedPerson.name}.`,
						error: true
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
		}
	}

	const deletePerson = (targetPerson) => (event) => {
		event.preventDefault()
		if (window.confirm(`Delete ${targetPerson.name}?`)) {
			AppService.deletePerson(targetPerson)
				.then(deletedPerson => {
					setPersons(persons.filter(person => person !== targetPerson))
					setNotification({
						message: `Deleted ${targetPerson.name}`,
						error: false
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
				.catch(deletedPerson => {
					setNotification({
						message: `${targetPerson.name} has already been deleted from the server`,
						error: true
					})
					setTimeout(() => setNotification({message: null, error: false}), 5000)
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification.message} error={notification.error}/>
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
