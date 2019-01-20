import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import './index.css'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null,
      notificationType: null,
      blog: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  

  handleFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }


  removeNotification = () => {
    setTimeout(() => {
      this.setState({
        notification: null,
        notificationType: null
      })
    }, 5000)
  }

  addNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: this.state.blog,
        author: this.state.user.name,
        userId: this.state.user.id
      })

      const newBlogs = this.state.blogs.concat(blog)
      this.setState({
        blog: '',
        blogs: newBlogs
      })
      this.setState({
        notification: `succeeded in adding blog "${blog.title}"`,
        notificationType: 'success'
      })
    } catch (exception) {
      this.setState({
        notification: 'error creating blog',
        notificationType: 'error'
      })
    }
    this.removeNotification()
  }


  deleteBlog = (blogId) => async () => {
    console.log(blogId)
    try {
      if (!window.confirm(`Do you want to delete blog ${blogId.title}`)) {
        return;
      }
      await blogService.deleteBlog(blogId._id)
      const newblogs = this.state.blogs.filter(b => b._id !== blogId._id)
      this.setState({blogs: newblogs})
      console.log('success')

    } catch(exception) {
      console.log(exception)
    }
  }


  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({
      user: null,
      notification: 'You have logged off',
      notificationType: 'success'
    })
    this.removeNotification()
  }


  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      console.log(user)
      blogService.setToken(user.token)

      this.setState({username: '', password: '', user})
      this.setState({
        notification: `${user.name} logged in`, 
        notificationType: 'success'
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(this.state.notification)
    } catch (exception) {
      this.setState({
        notification: 'virheellinen käyttäjätunnus tai salasana',
        notificationType: 'error'
      })
    }

    this.removeNotification()
  }

  likeBlog = (blog) => async () => {
    console.log('hei')
    try {
      console.log(blog.title)
      const newBlog = await blogService.update({
        title: blog.title,
        url: blog.url,
        author: blog.author,
        id: blog._id,
        likes: blog.likes + 1
      })

      let newBlogs = this.state.blogs.filter(b => b._id !== blog._id);
      console.log(newBlogs.length)
      newBlogs.push(newBlog)
      console.log(newBlogs.length)
      this.setState({blogs: newBlogs})
      this.setState({
        notification: 'Succesfully liked a blog', 
        notificationType: 'success'
      })
      
    } catch (exception) {
      this.setState({
        notification: 'Error liking a blog',
        notificationType: 'error'
      })
    }
    this.removeNotification()
  }

  render() {
    const blogs = this.state.blogs.sort(function(a,b ) {
      return b.likes - a.likes;
    })
    return (
      <div>
        <h2>Blogilista</h2>
        <Notification message={this.state.notification} type={this.state.notificationType}/>
         {this.state.user === null ? <Togglable buttonLabel="login" className="login"><LoginForm onFieldChange={this.handleFieldChange} username={this.state.username} password={this.state.password} loginHandler={this.login} className="form"/></Togglable>:  
        <div>

          <p>{this.state.user.name} logged in</p>
          <button onClick={this.logout}>log off</button>
          <BlogForm addBlog={this.addNewBlog} newBlog={this.state.blog} handleBlogChange={this.handleFieldChange}/>
          {blogs.map(blog => 
            <Blog key={blog._id} blog={blog} likeBlog={this.likeBlog} delete={this.deleteBlog} id={this.state.user.id}/>
        )}
        </div>
         }
      </div>
    );
  }
}

export default App;