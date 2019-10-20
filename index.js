// @desc dependancies
const app = require('express')()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// @desc http request handlers
app.get('/', (req,res) => {
    res.json({message:'hello world'})
})

// @desc app listeners
app.listen(3000, () => console.log('listening on port:3000'))