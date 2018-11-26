import React from 'react'
import Person from './components/Person'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './index.css'
import personServices from './services/persons'

/*
    The exercise assumes we can only have one person with a same name, thus name could have
    probably been used as an id for components here, but I decided to give each person an Id.
*/
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [

            ],
            newName: '',
            newNumber: '',
            filter : '',
            lastOperation : null,
            operationType: null
        }
    }
    
    componentDidMount() {
        personServices
            .getAll()
            .then(response => {
                this.setState({persons: response})
            })
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
    }

    findName = (name) => {
        const person = this.state.persons.filter(person => person.name.toLowerCase() === name.toLowerCase())
        return person.length > 0;
    }

    removePerson = (id) => {
        return () => {
            const person = this.state.persons.find(p => p.id === id)
            if (!window.confirm(`poistetaanko ${person.name} `)) {
                return;
            }

            personServices 
                .destroy(person.id)
                .then(newPerson => {

                    this.setState({
                        persons: this.state.persons.filter(p => p.id !== id),
                        lastOperation: `${person.name} poistettiin`,
                        operationType: 'removal'
                    })
                    setTimeout(() => {
                        this.setState({
                            lastOperation: null,
                            operationType: null
                        })
                      }, 3000)

                })
                .catch(error => {

                    this.setState({
                        persons: this.state.persons.filter(p => p.name !== person.name),
                        lastOperation: `${person.name} on jo poistettu!`,
                        operationType: 'removal'
                    })
                    setTimeout(()=> {
                        this.setState({
                            lastOperation: null,
                            operationType: null
                        })
                    }, 3000)
                })
        }
    }

    addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber,
        }   
        if (this.findName(this.state.newName)) {
            if (!window.confirm(`${nameObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                return
            }
            this.replaceNumber(nameObject)
            return
        }  

        personServices
            .create(nameObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    lastOperation: `${this.state.newName} lisättiin`,
                    operationType: 'creation',
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({
                        lastOperation: null,
                        operationType: null
                    })
                  }, 3000)
            })
    }

    replaceNumber = (Person) => {
        const prson = this.state.persons.find(p => p.name.toLowerCase() === Person.name.toLowerCase());
        Person.name = prson.name;
        personServices
            .update(prson.id, Person)
            .then(response => {
                const person = this.state.persons.filter(p => p.id !== prson.id)
                this.setState({
                    persons: person.concat(response),
                    lastOperation: `Henkilön ${prson.name} numero vaihdettiin`,
                    operationType: 'creation',
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({
                        lastOperation: null,
                        operationType: null
                    })
                  }, 3000)
            })
        
    }
    render() {
        const personsToShow = this.state.persons.filter(person => (person.name.toLowerCase()).includes(this.state.filter.toLowerCase()) || person.number.includes(this.state.filter)) 
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.lastOperation} type={this.state.operationType}/>
                <Filter handleFilterChange={this.handleFilterChange} filter={this.filter}/>
                <AddForm submit={this.addName} name={this.state.newName} handleName={this.handleNameChange} number={this.state.newNumber} handleNumber={this.handleNumberChange}/>
                <h2>
                    Numerot
                </h2>
                <div>
                    {personsToShow.map(person => <Person key = {person.id} name={person.name} numero={person.number} removePerson={this.removePerson(person.id)}/>)}
                </div>
            </div>
        )
    }
}

export default App