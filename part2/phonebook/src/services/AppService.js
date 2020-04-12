import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(url)
		.then(response => response.data)
}

const addPerson = (newPerson) => {
	return axios.post(url, newPerson)
		.then(response => response.data)
}

const deletePerson = (person) => {
	return axios.delete(`${url}/${person.id}`)
		.then(response => response.data)
}

export default {getAll, addPerson, deletePerson}
