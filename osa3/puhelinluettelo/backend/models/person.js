const mongoose = require('mongoose')
var Schema = mongoose.Schema

if (process.env.NODE.env !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

var personSchema = new Schema({ name: String, number: String });


personSchema.statics.format = function(person, cb) {
    return {
        name: person.name,
        number: person.number,
        id: person.id
    }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person