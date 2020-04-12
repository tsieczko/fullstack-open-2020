import React from 'react'

const Persons = ({persons}) => {
	return (
		<div>
			<h3>Numbers</h3>
			{persons.map(person =>
				<div key={person.name}>{person.name} {person.number}</div>
			)}
		</div>
	)
}

export default Persons
