const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// get all blogposts
blogsRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({})
  response.json(Blogs.map(Blog.format))
})

// add a new blogpost
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    await blog
      .save()

    response.json(Blog.format(blog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({error: 'something went wrong...'})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

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