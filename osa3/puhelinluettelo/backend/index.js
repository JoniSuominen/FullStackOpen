const http = require("http")
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
morgan.token('data', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('<h1>/api/persons sisältää luettelon! </h1>')
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons.map(Person.format))
        })
})

app.get('/info', (request, response) => {

    Person
        .find({})
        .then(persons => {
            const henkilot = `<p> puhelinluettelossa ${persons.length} henkilön tiedot </p>`
            const date = new Date()
            const time = `<p> ${date} </p>`
            response.send(henkilot + time)
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.number === undefined || body.name === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const person = new Person( {
        name: body.name,
        number: body.number,
    })

    Person
        .find({name: person.name})
        .then(result => {
            if (result.length > 0) {
                return response.status(400).json({error: 'person already exists'})
            } else {
                person
                .save()
                .then(savedPerson => {
                    response.json(Person.format(savedPerson))
                })
                .catch(error => {
                    console.log(error)
                })
            }
        })
        .catch(error => {
            console.log(error)
            return response.status(500).end()
        })
    
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(Person.format(person))
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
        })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person
        .findByIdAndUpdate(request.params.id, person, {new: true})
        .then(newPerson => {
            response.json(Person.format(newPerson))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
