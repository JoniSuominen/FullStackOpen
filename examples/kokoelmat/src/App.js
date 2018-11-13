import React from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            notes: [],
            newNote: 'uusi muistiinpano...',
            showAll: false
        }
        console.log('constructor')
    }
    componentDidMount() {
        console.log('did mount')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fullfilled')
                this.setState({notes: response.data})
            })
    }
    toggleVisible = () => {
        this.setState({showAll: !this.state.showAll})
    }
    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({newNote: event.target.value})
    }

    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,

        }
        
        axios.post('http://localhost:3001/notes', noteObject)
            .then(response => {
                this.setState({
                    notes:  this.state.notes.concat(response.data),
                    newNote: ''
                })
            })

    }

    toggleImportanceOf = (id) => {
        return () => {
            const note = this.state.notes.find(n => n.id == id)
            const changedNote = {...note, important: !note.important}
            console.log(`importance of  ${id} needs to be toggled`)

            noteService
                .getAll()
                .update(id, changedNote)
                .then(response => {
                    this.setState({ notes: response.data  })
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
        return (
            <div>
                <h1>Muistiinpanot</h1>
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
                <form onSubmit={this.addNote}>
                    <input
                    value={this.state.newNote}
                    onChange={this.handleNoteChange}
                    />
                    <button type="submit">tallenna</button>
                </form>
            </div>
        );
    }
}

export default App;