if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI
console.log(mongoUrl)

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.MONGDOB_TEST_URI
  console.log(mongoUrl)
}

module.exports = {
  mongoUrl,
  port
}