const config  = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch(error => {
		logger.error('Error connecting to MongoDB:', error.message)
	})

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
