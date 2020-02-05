const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Local strategy for Signing In
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Check DB for email
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }

        // Compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err) }
            if (!isMatch) { return done(null, false) }
            return done(null, user)
        })
    })
})


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.tokenSecret
}

// Create JWT Strategy - Signing Up
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
passport.use(localLogin)