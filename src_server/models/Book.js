const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    bookTitle: {
        type: String
    },
    bookImgUrl: {
        type: String
    },
    bookOwnerId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', BookSchema);