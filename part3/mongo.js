const mongoose = require('mongoose')

const password  = process.argv[2]
const url = `mongodb+srv://fullstack:fullstackUser@cluster0-hgmmx.azure.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
	const note = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})

	note.save()
	.then(result => {
		console.log('Note saved!', result)
		mongoose.connection.close()
	})
} else {
	Person.find({})
	.then(result => {
		console.log('phonebook:')
		result.forEach(note => {
			console.log(note.name, note.number);
		})
		mongoose.connection.close()
	})
}
