const express = require('express');
const jwt = require('jsonwebtoken');
// I am using fetch for the back-end
const fetch = require('node-fetch');

const passport = require('passport');
const authenticate = require('./authenticate.js');

const Book = require('./models/Book.js');
const Trade = require('./models/Trade.js');
const User = require('./models/User.js');
const config = require('../server.config.js');

const router = express.Router();

/* ****************************************** */
// USER ROUTES
/* ****************************************** */

router.get('/authenticate', (req, res, next) => authenticate.verifyUser(req, res, next), (req, res) => {
    if (req.isAuthenticated) {
        res.send(true);
    }
    else {
        res.send(false);
    }
});

router.put('/updateUser', (req, res) => {
    const username = req.body.username;
    const newInfo = req.body.newInfo;
    
    switch (req.body.option) {
        case 'email': {
            User.findOneAndUpdate({ username: username }, { email: newInfo.newEmail })
            .then((success) => {
                success.email = newInfo.newEmail;
                
                res.send({ result: success });
            })
            .catch(() => {
                res.send({ reason: 'Email is already in use.' }); 
            });
        }
        
            break;
            
        case 'location': {
            User.findOneAndUpdate({ username: username }, { city: newInfo.newCity, state: newInfo.newState })
            .then((success) => {
                success.city = newInfo.newCity;
                success.state = newInfo.newState;
                
                res.send({ result: success });
            })
            .catch((err) => {
                // this should not occur
                throw err;
            });
        }
        
            break;
            
        case 'password': {
            User.findOne({ username: username })
            .then((user) => {
                if (user) {
                    return new Promise((resolve, reject) => {
                        return User.comparePassword(resolve, reject, newInfo.oldPassword, user.password);
                    });
                }
                else {
                    res.send({ reason: 'User not found.' });
                    return Promise.reject();
                }
            })
            .then((isMatch) => {
                if (isMatch) {
                    return new Promise((resolve, reject) => {
                        return User.encrypt(resolve, reject, newInfo.newPassword);
                    });
                }
                else {
                    res.send({ reason: 'Incorrect old password; please try again.' });
                    return Promise.reject();
                }
            })
            .then((hash) => {
                return User.findOneAndUpdate({ username: username }, { password: hash });
            })
            .then((success) => {
                // keep the password hash from getting cached
                success.password = null;
                
                res.send({ result: success });
            })
            .catch((err) => {
                // this should not occur
                throw err;
            });
        }
        
            break;
            
        default: {
            res.send({ reason: 'Invalid update instructions received.' });
        }
    }
});

router.get('/userData', (req, res) => {
    User.findOne({ username: req.query.id })
    .then((user) => {
        if (user) {
            res.send({ user: user });
        }
        else {
            res.send({ reason: 'User not found.' });
        }
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.post('/newUser', (req, res) => {
    new Promise((resolve, reject) => { 
        return User.createUser(resolve, reject, req.body.information); 
    })
    .then((result) => {
        res.send({ user: result });
    })
    .catch(() => { 
        res.send({ reason: 'Username or email are already in use.' });
    });
});

router.post('/login', (req, res) => {
    // passport authentication utilizing jsonwebtokens
    User.findOne({ username: req.body.username })
    .then((user) => {
        if (user) {
            return new Promise((resolve, reject) => {
                return User.comparePassword(resolve, reject, req.body.password, user.password);
            })
            .then((isMatch) => {
                // user credentials check out, assign token to user for future authentication attempts
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 10800 });
                    res.send({ token: "Bearer " + token, user: user });
                }
                else {
                    res.send({ reason: 'Invalid username or password' });
                }
            })
            .catch(() => {
                res.send({ reason: 'Invalid username or password.' });
            });
        }
        else {
            res.send({ reason: 'Invalid username or password.' });
        }
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

/* ****************************************** */
// BOOK ROUTES
/* ****************************************** */

router.delete('/deleteBook', (req, res) => {
    Book.remove({ bookId: req.query.id })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.get('/loadBookPair', (req, res) => {
    Book.findOne({ bookId: req.query.idOne })
    .then((bookOne) => {
        if (bookOne) {
            Book.findOne({ bookId: req.query.idTwo })
            .then((bookTwo) => {
                if (bookTwo) {
                    res.send({ bookOne: bookOne, bookTwo: bookTwo });
                }
                else {
                    res.send({ reason: 'Book two could not be found in the system.' });
                }
            })
            .catch((err) => {
                // this should not occur unless the db is offline
                throw err;
            });
        }
        else {
           res.send({ reason: 'Book one could not be found in the system.' });
        }
    })
    .catch((err) => {
        // this should not occur unless the db is offline
        throw err;
    });
});

router.get('/spreadOfBooks', (req, res) => {
    Book.find(req.query.id ? { bookOwnerId: req.query.id } : {})
    .then((result) => {
        // regardless of the contents...
        res.send(result);
    })
    .catch((err) => {
        // this should not occur unless the db is offline
        throw err;
    });
});

router.get('/newBooks', (req, res) => {
    fetch("https://www.googleapis.com/books/v1/volumes?maxResults=6&key=" + config.gKey + "&q=" + req.query.title)
    .then(resp => resp.json())
    .then((response) => {
        // pass all the results for user selection
        res.send(response.items); 
    })
    .catch((err) => {
        // this should not occur unless the google api is offline
        throw err;
    });
});

router.post('/newBook', (req, res) => {
    const book = req.body.book;
    
    Book.create({
        bookId: book.bookId,
        bookTitle: book.bookTitle,
        bookImgUrl: book.bookImgUrl,
        bookOwnerId: req.body.userId
    })
    .then((result) => {
        res.send({ success: result });
    })
    .catch((e) => {
        // unique book ids only
        console.log(e);
        res.send({ reason: 'Sorry, but this book has already been added to the system.' }); 
    });
});

module.exports = router;

/* ****************************************** */
// TRADE ROUTES
/* ****************************************** */

router.post('/newTrade', (req, res) => {
    // pocket function for Date objects
    Date.prototype.yyyymmdd = function() {
        const mm = this.getMonth() + 1; // zero-based
        const dd = this.getDate();
    
        return [this.getFullYear(), '-', (mm>9 ? '' : '0') + mm, '-', (dd>9 ? '' : '0') + dd].join('');
    };
    
    fetch(config.baseURL + "/loadBookPair?idOne=" + req.body.offer + "&idTwo=" + req.body.quarry)
    .then(resp => resp.json())
    .then((response) => {
        const bookOne = response.bookOne;
        const bookTwo = response.bookTwo;
        
        return Trade.create({
            senderId: bookOne.bookOwnerId,
            receiverId: bookTwo.bookOwnerId,
            'bookOffer.offerId': req.body.offer,
            'bookOffer.offerTitle': bookOne.bookTitle,
            'bookOffer.offerImgUrl': bookOne.bookImgUrl,
            'bookQuarry.quarryId': req.body.quarry,
            'bookQuarry.quarryTitle': bookTwo.bookTitle,
            'bookQuarry.quarryImgUrl': bookTwo.bookImgUrl,
            timeCreated: (new Date()).yyyymmdd()
        });
    })
    .then((success) => {
        res.send({ success: success });
    })
    .catch(() => {
        res.send({ reason: 'The book you selected to offer is already being used in an existing trade. Delete that trade first or select a different book to offer.' });
    });
});

router.get('/tallyTrades', (req, res) => {
    Trade.find({})
    .then((trades) => {
        const userSent = trades.filter(item => item.senderId == req.query.userId).length;
        const userReceived = trades.filter(item => item.receiverId == req.query.userId).length;
        
        res.send({ userS: userSent, userR: userReceived }); 
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.get('/queryTrades', (req, res) => {
    Trade.find(req.query.option == 'sender' ? { senderId: req.query.id } : { receiverId: req.query.id })
    .then((results) => {
        res.send({ success: results });
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.get('/loadTrade', (req, res) => {
    Trade.findOne({ _id: req.query.tradeId })
    .then((trade) => {
        res.send({ trade: trade });
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.put('/acceptTrade', (req, res) => {
    Trade.findOne({ _id: req.body.tradeId })
    .then((trade) => {
        return Book.find({ $or: [{ bookId: trade.bookOffer.offerId }, { bookId: trade.bookQuarry.quarryId }] });
    })
    .then((books) => {
        console.log('****');
        console.log(books);
        
        const temp = books[0].bookOwnerId;
        books[0].bookOwnerId = books[1].bookOwnerId;
        books[1].bookOwnerId = temp;
        
        books[0].markModified('bookOwnerId');
        books[1].markModified('bookOwnerId');
        
        return Promise.all([books[0].save(), books[1].save()]);
    })
    .then(() => {
        return Trade.remove({ _id: req.body.tradeId });
    })
    .then((result) => {
        res.send({ success: result });
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});

router.delete('/deleteTrade', (req, res) => {
    Trade.remove({ _id: req.query.tradeId })
    .then((result) => {
        res.send({ result: result });
    })
    .catch((err) => {
        // this should not occur
        throw err;
    });
});