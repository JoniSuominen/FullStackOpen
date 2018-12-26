const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')



describe('there are some blogs already', async () => {


  beforeEach(async () => {
    await Blog.remove()
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
  })
  
  
  test('blogs are returned', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('adding new blogs', async () => {

    test('adding new blogs works', async () => {
  
      await api
        .post('/api/blogs')
        .send(helper.blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
      const response = await helper.blogsInDb()
      const contents = response.map(Blog.formatWithoutId)
  
      expect(response.length).toBe(helper.initialBlogs.length + 1)
      expect(contents).toContainEqual(helper.blog)
      
    })
  
    test('a blog with no likes can be added', async() => {
      await api
        .post('/api/blogs')
        .send(helper.blogWithNoLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const response = await helper.blogsInDb()
      const contents = response.map(b => b.title)
  
      expect(response.length).toBe(helper.initialBlogs.length + 1)
      const title = helper.blogWithNoLikes.title
      expect(contents).toContain(title)
            
    })
    test('a blog with no title or url cant be added', async () => {
      await api
        .post('/api/blogs')
        .send(helper.noTitleBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      await api
        .post('/api/blogs')
        .send(helper.noUrlBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  
  })

  describe('deleting blogs', async () => {

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {


      let addedBlog = new Blog({
        title: 'Hello',
        author: 'tester',
        url: 'randomperson.org',
        likes: 2
      })
      await addedBlog.save()

      const blogsBefore = await helper.blogsInDb()


      const id = addedBlog._id
      const url = `/api/blogs/${id}`

      await api
        .delete(url)
        .expect(204)

      const blogsAfter = await helper.blogsInDb()
      
      const contents = blogsAfter.map(b => b.title)

      expect(contents).not.toContain(helper.tile)
      expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    })
  })

  describe('modifying blogs', async () => {

    test('PUT /delete/blogs/:id succeeds with proper content', async () => {
      let newBlog = new Blog({
        title: 'blog to modify',
        author: 'Modifier',
        url: 'modify',
        likes: 3
      })

      const savedBlog = await newBlog.save()

      console.log(savedBlog._id)

      await api
        .put(`/api/blogs/${savedBlog._id}`)
        .send(helper.editedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDb()

      const contents = blogsAfter.map(b => b.title)

      expect(contents).not.toContain(newBlog.title)
      expect(contents).toContain(helper.editedBlog.title)

      console.log('ready')

    })
  })


describe.only('when there is initially one user at db', async () => {

  beforeEach(async () => {
    await User.remove()
    const user = new User({username: 'root', password: 'sekret'})
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sekret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    
    expect(result.body).toEqual({error: 'username must be unique'})
    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode if password is too short', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'moi!',
      name: 'Superuser',
      password: 'qw'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    
    expect(result.body).toEqual({error: 'the password must be at least 3 letters long'})
    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})

})

