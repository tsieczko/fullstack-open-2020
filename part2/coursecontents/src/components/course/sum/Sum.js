import React from 'react'

const Sum = ({parts}) => {
	const sum = parts.reduce((acc, part) => {
		return acc + part.exercises
	}, 0)

	return (
		<div>
			<b>total of {sum} exercises</b>
		</div>
	)
}

export default Sum
