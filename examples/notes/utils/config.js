if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.port
let mongoUrl = process.env.MONGODB_URI
console.log(mongoUrl)

if (process.env.NODE_ENV ==='test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  mongoUrl,
  port
}