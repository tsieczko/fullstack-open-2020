import React from 'react'

const CountryDetail = ({country}) => {
	return(
		<div>
			<h1>{country.name}</h1>
			<p>capital: {country.capital}</p>
			<p>population: {country.population}</p>
			<h2>languages</h2>
			<ul>
				{country.languages.map((language, i) =>
					<li key={i}>{language.name}</li>
				)}
			</ul>
			<img src={country.flag} width="250px" alt={`Flag of ${country.name}`}/>
		</div>
	)
}

const CountrySimple = ({country, showCountry}) => {
	return (
		<div>
			{country.name}
			<button onClick={showCountry(country.name)}>show</button>
		</div>
	)
}

const CountryList = ({countries, filter, showCountry}) => {
	const filteredCountries = countries.filter(country => {
		return country.name.toLowerCase().includes(filter.toLowerCase())
	})

	if (filteredCountries.length === 1) {
		return (
			<div>
				<CountryDetail country={filteredCountries[0]} />
			</div>
		)
	}

	else if (filteredCountries.length <= 10) {
		return (
			<div>
				{filteredCountries.map((country, i) =>
					<CountrySimple key={i} country={country} showCountry={showCountry}/>
				)}
			</div>
		)
	}

	else {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
}

export default CountryList
