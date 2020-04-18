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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
