const mongoose = require('mongoose')

if (processö.env.NODE.env !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if (process.argv.length > 2) {
    
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    person
        .save()
        .then(response => {
            console.log(`lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
            mongoose.connection.close()
        })
} else {
    console.log('puhelinluettelo: ')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, " ", person.number)
            })
            mongoose.connection.close()
        })
}