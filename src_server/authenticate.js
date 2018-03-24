const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');
const config = require('../server.config.js');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwtPayload, callback) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
        if (err) {
            return callback(err, false);
        }
        else if (user) {
            return callback(null, user);
        }
        else {
            return callback(null, false);
        }
    });
}));

exports.verifyUser = (req, res, next) => {
    return passport.authenticate('jwt', (err, user, info) => {
        if (err || !user) {
            req.isAuthenticated = false;
            next();
        }
        else {
            req.isAuthenticated = true;
            next();
        }
    })(req, res, next);
};