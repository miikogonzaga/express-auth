const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define User model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
})

// On save hook, encrypt password
// Before save, run pre function
userSchema.pre('save', function(next) {
    // Get access to user model
    const user = this

    // Generate salt and run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err) }

        // Hash/Encrypt password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err) }

            // Overwrite plain text password with encrypted password
            user.password = hash
            next()
        })
    })
})

// Compare passwords for Local Strategy Signing In
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch)
    })
}

// Create model class
const ModelClass = mongoose.model('user', userSchema)

// Export ModelClass
module.exports = ModelClass
