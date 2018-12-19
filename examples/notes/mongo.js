const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)

const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})

const note = new Note ({
    content: 'MongoDB on NoSQL tietokanta',
    date: new Date(),
    important: true
})
/*

note
    .save()
    .then(response => {
        console.log('note saved')
        mongoose.connection.close()
    })
*/

Note 
    .find({important: true})
    .then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
