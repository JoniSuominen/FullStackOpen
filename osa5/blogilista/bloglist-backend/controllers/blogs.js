const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// get all blogposts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {_id: 1, username: 1, name: 1})

  response.json(blogs.map(Blog.format))
})

// add a new blogpost
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    console.log(request.get('authorization'))
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      console.log("xd")
      return response.status(401).json({error: 'token missing or invalid'})
    }

    if (body.userId !== decodedToken.id) {
      console.log("xd")
      return response.status(401).json({error: 'seperate user token id and user id'})
    }

    if (!body.title ) {
      console.log("lol")
      return response.status(400).json({error: 'content missing'})
    }


    const user = await User.findById(decodedToken.id)

    const users = await User.find({})
    console.log(users.length)
    console.log(decodedToken.id)
    console.log(user.id)
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url || '',
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(blog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'something went wrong...'})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const blog = await Blog.findById(request.params.id)

    console.log(blog.user.toString())
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    
    if (decodedToken.id !== blog.user.toString() && blog.user.toString()) {
      return response.status(401).json({error: 'seperate user token id and user id'})
    }

    if (!decodedToken.Id && !blog.user.toString()) {
      return response.status(401).json({error: 'you must be logged in'})
    }


    await blog.remove()

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})


blogsRouter.put('/:id', async (request, response) => {
  try {

    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    
    const addedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(Blog.format(addedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }

})

module.exports = blogsRouter