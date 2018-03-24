const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const Trade = require('./Trade');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// The following functions are promise-dependent utilizing (resolve, reject)

module.exports.encrypt = (resolve, reject, string) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        
        bcrypt.hash(string, salt, (err, hash) => {
            if (err) return reject(err);
            
            return resolve(hash); 
        });
    });
};

module.exports.createUser = (resolve, reject, credentials) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        
        bcrypt.hash(credentials.password, salt, (err, hash) => {
            if (err) return reject(err);
            
            const promise = User.create({ 
                username: credentials.username, 
                password: hash, 
                email: credentials.email, 
                city: credentials.city, 
                state: credentials.state,
                tradeRequests: {
                    sent: [],
                    received: []
                } 
            });
            
            return resolve(promise);
        });
    });
};

module.exports.comparePassword = (resolve, reject, candidate, hash) => {
    bcrypt.compare(candidate, hash, (err, isMatch) => {
        if (err) return reject('Invalid username or password.');
        
        return resolve(isMatch);
    });
};