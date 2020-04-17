const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => {
			logger.error('Error in get:', error)
			response.status(404).end()
		})
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
	.save()
	.then(result => {
		response.status(201).json(result)
	})
	.catch(error => {
		logger.error('Error in post', error)
		response.status(404).end()
	})
})

module.exports = blogsRouter
