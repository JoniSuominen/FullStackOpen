if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.port
let mongoUrl = process.env.MONGODB_URI

if (process.env.NODE_ENV == 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.MONGDOB_TEST_URI
}

module.exports = {
  mongoUrl,
  port
}