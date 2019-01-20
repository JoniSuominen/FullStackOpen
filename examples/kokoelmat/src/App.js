import React from 'react'
import Note from './components/Note'
import './index.css'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            notes: [],
            newNote: 'uusi muistiinpano...',
            showAll: true,
            error: null,
            username: '',
            password: '',
            user: null
        }
    }

    componentWillMount() {
      noteService
        .getAll()
        .then(notes => {
          this.setState({ notes })
        })
  
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({ user })
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
        
        const noteForm = () => (
          <Togglable buttonLabel="new note" ref={component => this.noteForm = component}>
            <NoteForm
              addNote={this.addNote} 
              newNote={this.state.newNote} 
              handleNoteChange={this.handleNoteChange}
         
            />
          </Togglable>
        )

        const loginForm = () => (
          <Togglable buttonLabel="login">
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            loginHandler={this.login}
            handleFieldChange={this.handleFieldChange}
          />
          </Togglable>
        )
        
        return (
            <div>
                <h1>Muistiinpanot</h1>
                <Notification message={this.state.error}/>

                {this.state.user === null ?
                loginForm() :
                <div>
                  <p> {this.state.user.name} logged in </p>
                  {noteForm()}
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
        )
    }
}

export default App;