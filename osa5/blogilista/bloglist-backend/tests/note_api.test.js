const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')



describe('there are some blogs already', async () => {

  beforeEach(async () => {
    await Blog.remove({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray) 
  })
  
  
  describe('blog operations with logged in user', async () => {

    let token
    let addedUser

    beforeAll(async () => {
      await User.remove({})
  
      const user = {username: 'hehe', password: 'sekret', name: 'arto'};
      addedUser = await api
        .post('/api/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const login = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      token = login.body.token
    })


    test('blogs are returned', async () => {

      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    })

    describe('adding new blogs', async () => {

      test('adding new blogs works', async () => {

        console.log(token)
        console.log(addedUser.body.id);
        const data = {
          title: helper.blog.title,
          author: helper.blog.author,
          url: helper.blog.url,
          likes: helper.blog.likes,
          userId: addedUser.body.id
        };

        await api
          .post('/api/blogs')
          .send(data)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          
        const response = await helper.blogsInDb()
        const contents = response.map(Blog.formatWithoutId)
    
        expect(response.length).toBe(helper.initialBlogs.length + 1)
        expect(contents).toContainEqual(helper.blog)
        
      })
    
      test('a blog with no likes can be added', async() => {

        const data = {
          title: helper.blogWithNoLikes.title,
          author: helper.blogWithNoLikes.author,
          url: helper.blogWithNoLikes.url,
          userId: addedUser.body.id
        }

        await api
          .post('/api/blogs')
          .send(data)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const response = await helper.blogsInDb()
        const contents = response.map(b => b.title)
    
        expect(response.length).toBe(helper.initialBlogs.length + 1)
        const title = helper.blogWithNoLikes.title
        expect(contents).toContain(title)
              
      })
      test('a blog with no title or url cant be added', async () => {
        const noTitleData = helper.noTitleBlog
        noTitleData.userId = addedUser.body.id

        await api
          .post('/api/blogs')
          .send(noTitleData)
          .set('Authorization', 'Bearer ' + token)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const noUrlData = helper.noUrlBlog
        noUrlData.userId = addedUser.body.id
    
        await api
          .post('/api/blogs')
          .send(noUrlData)
          .set('Authorization', 'Bearer ' + token)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })
    
    })
    describe('deleting blogs', async () => {

      test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => { 
        console.log('hei!')

        let addedBlog = {
          title: 'Hello',
          author: 'tester',
          url: 'randomperson.org',
          likes: 2,
          userId: addedUser.body.id
        }

        console.log(addedBlog.userId)

        const newBlog = await api
          .post('/api/blogs')
          .send(addedBlog)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsBefore = await helper.blogsInDb()


        const id = newBlog.body.id
        console.log(newBlog.body.id)
        const url = `/api/blogs/${id}`

        await api
          .delete(url)
          .set('Authorization', 'Bearer ' + token)
          .expect(204)

        const blogsAfter = await helper.blogsInDb()
        
        const contents = blogsAfter.map(b => b.title)

        expect(contents).not.toContain(helper.tile)
        expect(blogsAfter.length).toBe(blogsBefore.length - 1)
      })
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
})

describe('when there is initially one user at db', async () => {

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

