import React, {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: 123456789
		}
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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
			{persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
		</div>
	)
}

export default App
