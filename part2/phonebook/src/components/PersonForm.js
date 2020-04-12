import React from 'react'

const PersonForm = (props) => {
	return(
		<form>
			<div>
				<h3>Add a person</h3>
			</div>
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

export default PersonForm
