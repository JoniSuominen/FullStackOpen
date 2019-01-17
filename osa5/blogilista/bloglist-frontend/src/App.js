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

  render() {
    return (
      <div>
        <h2>Blogilista</h2>
        <Notification message={this.state.notification} type={this.state.notificationType}/>
         {this.state.user === null ? <Togglable buttonLabel="login"><LoginForm onFieldChange={this.handleFieldChange} username={this.state.username} password={this.state.password} loginHandler={this.login}/></Togglable>:  
        <div>

          <p>{this.state.user.name} logged in</p>
          <button onClick={this.logout}>log off</button>
          <BlogForm addBlog={this.addNewBlog} newBlog={this.state.blog} handleBlogChange={this.handleFieldChange}/>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
        )}
        </div>
         }
      </div>
    );
  }
}

export default App;