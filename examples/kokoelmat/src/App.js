import React from 'react'
import Note from './components/Note'
import './index.css'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import Login from './components/LoginForm'
import NoteForm from './components/NoteForm'

console.log('qdjiwqdjiwqodjqwo')


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            notes: [],
            newNote: 'uusi muistiinpano...',
            showAll: false,
            error: null,
            username: '',
            password: '',
            user: null,
            loginVisible: false
        }
        console.log('constructor')
    }

    componentDidMount() {
        console.log('did mount')
        noteService
            .getAll()
            .then(response => {
                console.log('promise fullfilled')
                this.setState({notes: response})
            })

        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          this.setState({user})
          noteService.setToken(user.token)
        }
    }


    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,

        }
        
        noteService
            .create(noteObject)
            .then(newNote => {
                this.setState({
                    notes:  this.state.notes.concat(newNote),
                    newNote: ''
                })
            })

    }

    login = async (event) => {
      event.preventDefault()
      console.log('logging in with', this.state.username, this.state.password)

      try {
        const user = await loginService.login({
          username: this.state.username,
          password: this.state.password
        })

        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        noteService.setToken(user.token)
        this.setState({username: '', password: '', user})
      } catch (exception) {
        this.setState({
          error: 'käyttäjätunnus tai salasana virheellinen'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
    }

    handleNoteChange = (event) => {
      console.log(event.target.value)
      this.setState({newNote: event.target.value})
    }

    handleFieldChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
    
  
    toggleVisible = () => {
      this.setState({showAll: !this.state.showAll})
    }

    toggleImportanceOf = (id) => {
        return () => {
            const note = this.state.notes.find(n => n.id === id)
            const changedNote = {...note, important: !note.important}
            console.log(`importance of  ${id} needs to be toggled`)

            noteService
                .update(id, changedNote)
                .then(changedNote => {
                    const notes = this.state.notes.filter(n => n.id !== id)
                    this.setState({
                        notes: notes.concat(changedNote)
                    })
                })
                .catch(error => {
                    this.setState({
                        error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
                        notes: this.state.notes.filter(n => n.id !== id)
                    })
                    setTimeout(() => {
                        this.setState({
                            error: null
                        })
                    }, 5000)
                })
            
        }
    }

    render() {
        console.log('render')
        const notesToShow = 
            this.state.showAll ?
                this.state.notes :
                this.state.notes.filter(note => note.important)

        const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
        
        const loginForm = () => {
          const hideWhenVisible = {display: this.state.loginVisible ? 'none': ''}
          const showWhenVisible = {display : this.state.loginVisible ? '' : 'none'}
          return (
              <div>
                <div style = {hideWhenVisible}>
                  <button onClick={e => this.setState({ loginVisible: true})}>log in</button>
                </div>
                <div style ={showWhenVisible}>
                <Login 
                  loginHandler = {this.login} 
                  username = {this.state.username} 
                  password = {this.state.password} 
                  handleFieldChange = {this.handleFieldChange}
                />
                <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
                </div>
              </div>
          )
        }
        
        return (
            <div>
                <h1>Muistiinpanot</h1>
                <Notification message={this.state.error}/>

                {this.state.user === null ?
                loginForm() :
                <div>
                  <p> {this.state.user.name} logged in </p>
                  <NoteForm addNote={this.addNote} newNote={this.state.newNote} handleNoteChange={this.handleNoteChange} />
                </div>
                }
                <h2>Muistiinpanot</h2>
                <div>
                    <button onClick ={this.toggleVisible}>
                    näytä {label}
                    </button>
                </div>
                <ul>   
                    {notesToShow.map(note =>
                    <Note 
                    key={note.id} 
                    note={note}
                    toggleImportance={this.toggleImportanceOf(note.id)}
                    />)}
                </ul>
            </div>
        );
    }
}

export default App;