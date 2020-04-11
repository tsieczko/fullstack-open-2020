import React from 'react'

const SearchBox = ({search, setSearch}) => {
	return (
		<div>
			Search
			<input
				value={search}
				onChange={
					event => setSearch(event.target.value)
				}
			/>
		</div>
	)
}

export default SearchBox
