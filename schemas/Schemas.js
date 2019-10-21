const mongoose = require('mongoose')

// @desc different schemas
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
})

// @desc img schema
const ImageSchema = new mongoose.Schema({
    data:Buffer
})

// @desc schema output
module.exports = {
    User:UserSchema,
    Image:ImageSchema
}