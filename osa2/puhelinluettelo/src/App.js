import React from 'react';
import Person from './components/Person'
import AddForm from './components/AddForm'
import Filter from './components/Filter'

/*
    The exercise assumes we can only have one person with a same name, thus name could have
    probably been used as an id for components here, but I decided to give each person an Id.
*/
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {name: 'Arto Hellas', number: '040-512478', id : 1},
                { name: 'Martti Tienari', number: '040-123456', id: 2 },
                { name: 'Arto Järvinen', number: '040-123456', id: 3 },
                { name: 'Lea Kutvonen', number: '040-123456', id: 4 }   
            ],
            newName: '',
            newNumber: '',
            filter : ''
        }
    }
    ReactDo

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
        let found = false;
        this.state.persons.map(person => found = (person.name === name))
        return found
    }

    addName = (event) => {
        event.preventDefault()
        if (this.findName(this.state.newName)) {
            return
        }
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }

        
        const persons = this.state.persons.concat(nameObject)
        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })
    }
    render() {
        const personsToShow = this.state.persons.filter(person => (person.name.toLowerCase()).includes(this.state.filter.toLowerCase()) || person.number.includes(this.state.filter)) 
        console.log(this.state.filter)
        console.log(this.state.persons.length)
        console.log(personsToShow.length)
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter handleFilterChange={this.handleFilterChange} filter={this.filter}/>
                <AddForm submit={this.addName} name={this.state.newName} handleName={this.handleNameChange} number={this.state.newNumber} handleNumber={this.handleNumberChange}/>
                <h2>
                    Numerot
                </h2>
                <div>
                    {personsToShow.map(person => <Person key = {person.id} name={person.name} numero={person.number}/>)}
                </div>
            </div>
        )
    }
}

export default App