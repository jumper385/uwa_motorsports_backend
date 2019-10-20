// @desc dependancies
const app = require('express')()
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const bodyParser = require('body-parser')
const GridFsStorage = require('multer-gridfs-storage')

// @desc mongoose setup
mongoose.connect(
    'mongodb://localhost/uwa_motorsports', 
    {useNewUrlParser:true, useUnifiedTopology:true}
)

// @desc mongoose schemas
const Schemas = require('./schemas/Schemas')
const User = mongoose.model('User', Schemas.User)

// @desc express middleware
app.use(morgan('dev'))

// @desc http request handlers
app.get('/', (req,res) => {
    res.json({message:'hello world'})
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))