import axios from 'axios'

const url = 'api/persons'

const getAll = () => {
	return axios.get(url)
		.then(response => response.data)
}

const addPerson = (person) => {
	return axios.post(url, person)
		.then(response => response.data)
}

const deletePerson = (person) => {
	return axios.delete(`${url}/${person.id}`)
		.then(response => response.data)
}

const updatePerson = (person) => {
	return axios.put(`${url}/${person.id}`, person)
		.then(response => response.data)
}

export default {getAll, addPerson, deletePerson, updatePerson}
