const mongoose = require('mongoose')

// @desc different schemas
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
})

// @desc schema output
module.exports = {
    User:UserSchema
}