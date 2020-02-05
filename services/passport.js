const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.tokenSecret
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if user ID in payload exists in DB
    // If true, call 'done'
    // If false, call done without user object
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false) }

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})

// Tell passport to use strategy
passport.use(jwtLogin)