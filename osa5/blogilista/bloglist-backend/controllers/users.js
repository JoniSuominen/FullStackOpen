const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({username: body.username})

        if (existingUser.length > 0) {
            return response.status(400).json({error: 'username must be unique'})
        }

        if (body.password.length < 3) {
            return response.status(400).json({error: 'the password must be at least 3 letters long'})
        }

        const saltrounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltrounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: (body.age >= 18 || body.age === undefined)  ? true : false
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})
    }
})


usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs')
    response.json(users.map(User.format))
})

module.exports = usersRouter