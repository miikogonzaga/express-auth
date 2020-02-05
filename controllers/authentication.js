const User = require('../models/user')

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    // Check for email and password
    if (!email || !password) {
        return res.status(422).send({ error: 'Provide email and password' })
    }

    // Check if email exists in DB
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { 
            return next(err) 
        }

        // If user with email exists, return error
        if (existingUser) { 
            return res.status(422).send({ error: 'Email is in use' })
        }

        // If user doesn't exist, create and save user record
        const user = new User({
            email: email,
            password: password
        })

        user.save(function(err) {
            if (err) {
                return next(err)
            }
        })

        // Respond to request indicating user created
        res.json('Success true')
    })

}