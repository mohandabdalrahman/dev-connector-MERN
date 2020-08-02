const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
dotenv.config({ path: './config.env' })
const app = express()
// connect database
require('./database/db')
require('./database/models/User')

// init middleware
app.use(express.json({ extended: false }))
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Define routes
app.use('/api/v1/users', require('./routes/user'))
app.use('/api/v1/profile', require('./routes/profile'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/posts', require('./routes/posts'))

//SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // SET STATIC FOLDER
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT, () => console.log(`App is listen on PORT : ${process.env.PORT}`))