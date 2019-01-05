const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favoriteBlog, nextBlog) => {
    return favoriteBlog.likes < nextBlog.likes ? nextBlog : favoriteBlog
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostLikes = (blogs) => {
  let authors = []
  let mostLikes = blogs[0]
  blogs.forEach(element => {
    let author
    if (authors.length > 0) {
      let person = authors.find(at => at.author === element.author)
      author = person

    }
    if (author !== undefined) {
      author.likes += element.likes
    } else {
      author = {
        author: element.author,
        likes: element.likes
      }
      authors.push(author)
    }
    if (author.likes > mostLikes.likes) {
      mostLikes = author
    }
  })
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
}