import React from 'react'

const Person = ({person, deletePerson}) => {
	return (
		<div>
			{person.name} {person.number}
			<button onClick={deletePerson(person)}>delete</button>
		</div>
	)
}

const Persons = ({persons, deletePerson}) => {
	return (
		<div>
			<h3>Numbers</h3>
			{persons.map(person =>
				<Person
					key={person.id}
					person={person}
					deletePerson={deletePerson}
				/>
			)}
		</div>
	)
}

export default Persons
