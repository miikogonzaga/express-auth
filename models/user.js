const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define User model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
})

// Create model class
const ModelClass = mongoose.model('user', userSchema)

// Export ModelClass
module.exports = ModelClass
