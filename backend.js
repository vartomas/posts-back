const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const postRoute = require('./routes/postRoute')
const authRoute = require('./routes/auth')
const privatePostRoute = require('./routes/privatePost')

app.use(cors())
app.use(express.json())

app.use('/privateposts', privatePostRoute)
app.use('/posts', postRoute)
app.use('/user', authRoute)

mongoose.connect(
  process.env.DB_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('prisijungta sekmingai')
  }
)

app.listen(process.env.PORT)
