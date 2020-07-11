const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config({ path: './config.env' })
const app = express()
// connect database
require('./database/db')
require('./database/models/User')

// init middleware
app.use(express.json({ extended: false }))


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Define routes
app.use('/api/v1/users', require('./routes/user'))
app.use('/api/v1/profile', require('./routes/profile'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/posts', require('./routes/posts'))

app.listen(process.env.PORT, () => console.log(`App is listen on PORT : ${process.env.PORT}`))