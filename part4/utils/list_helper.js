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

module.exports = {
	dummy,
	totalLikes
}
