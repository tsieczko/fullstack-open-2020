import React from 'react'

import Header from './header/Header'
import Content from './content/Content'

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

export default Course
