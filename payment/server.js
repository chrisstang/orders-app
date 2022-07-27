const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// Routes
app.use('/', require('./routes/index'))

const PORT = 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))