import React from 'react'

import Header from './header/Header'
import Content from './content/Content'
import Sum from './sum/Sum'

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Sum parts={course.parts} />
		</div>
	)
}

export default Course
