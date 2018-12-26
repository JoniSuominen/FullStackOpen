const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Web-ohjelmoinnin uutuudet',
    author: 'Joni Suominen',
    url: 'github.com/JoniSuominen',
    likes: 5
  },
  {
    title: 'C++-ohjelmointi',
    author: 'Joni Suominen',
    url: 'github.com',
    likes: 2
  }
]

const blogWithNoLikes = {
  title: 'NodeJS on palvelinpuolen framework, joka toimii JavaScriptillä',
  author: 'Joni Suominen',
  url: 'github.com/JoniSuominen'
}


const blog = {
  title: 'Lint parantaa koodinkirjoitusta',
  author: 'Joni',
  url: 'Google lint',
  likes: 5
}


const editedBlog = {
  title: 'This blog has been edited through PUT request',
  author: 'Editor',
  url: 'https://sookocheff.com/post/api/when-to-use-http-put-and-http-post/',
  likes: 4
}

const noTitleBlog = {
  author: 'Joni',
  url: 'google.com',
  likes: 5
}

const noUrlBlog = {
  author: 'Joni',
  title: 'Node'
}


const blogsInDb = async () => {
  const Blogs = await Blog.find({})
  return Blogs
}

const usersInDb = async () => {
  const Users = await User.find({})
  return Users
}


module.exports = {
  initialBlogs, blogWithNoLikes, blog, blogsInDb, noTitleBlog, noUrlBlog, editedBlog, usersInDb
}