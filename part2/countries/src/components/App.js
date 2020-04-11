import React, {useState, useEffect} from 'react'
import axios from 'axios'

import SearchBox from './SearchBox/SearchBox'
import CountryList from './CountryList/CountryList'

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('sw')
	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const showCountry = (country) => () => {
		setSearch(country)
	}


	return (
		<div>
			<SearchBox search={search} setSearch={setSearch}/>
			<CountryList countries={countries} filter={search} showCountry={showCountry} />
		</div>
	)
}

export default App;
