const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length == 0) {
		return 0
	}

	return blogs.reduce((acc, cur) => {
		return {
			likes: acc.likes + cur.likes
		}
	}).likes
}

const favoriteBlog = (blogs) => {
	if (blogs.length == 0) {
		return {}
	}

	return blogs.reduce((acc, cur) => {
		if (cur.likes > acc.likes) {
			return cur
		} else{
			return acc
		}
	})
}

const mostBlogs = (blogs) => {
	if (blogs.length == 0) {
		return {}
	}
	
	const authorBlogMap = {}

	blogs.forEach(blog => {
		if (authorBlogMap[blog.author]) {
			authorBlogMap[blog.author] += 1
		} else {
			authorBlogMap[blog.author] = 1
		}

	})

	const topAuthor = Object.keys(authorBlogMap).reduce((acc, cur) => {
		if (authorBlogMap[acc] < authorBlogMap[cur]) {
			return cur
		} else {
			return acc
		}
	})

	return {
		author: topAuthor,
		blogs: authorBlogMap[topAuthor]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
