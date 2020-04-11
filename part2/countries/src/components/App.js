import React, {useState, useEffect} from 'react'
import axios from 'axios'

import SearchBox from './SearchBox/SearchBox'
import CountryList from './CountryList/CountryList'

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')
	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	return (
		<div>
			<SearchBox search={search} setSearch={setSearch}/>
			<CountryList countries={countries} filter={search} />
		</div>
	)
}

export default App;
