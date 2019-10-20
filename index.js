// @desc dependancies
const app = require('express')()
const mongoose = require('mongoose')
const morgan = require('morgan')

// @desc mongoose setup
mongoose.connect(
    'mongodb://localhost/uwa_motorsports', 
    {useNewUrlParser:true, useUnifiedTopology:true}
)

// @desc mongoose schemas
const Schemas = require('./schemas/Schemas')
const User = mongoose.model('User', Schemas.User)

// @desc express middleware
app.use(morgan('tiny'))

// @desc http request handlers
app.get('/', (req,res) => {
    res.json(newUser)
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))