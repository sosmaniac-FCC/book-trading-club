const mongoose = require('mongoose');

const Book = require('./Book');

const TradeSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    bookOffer: {
        offerId: {
            type: String,
            required: true,
            unique: true
        },
        offerTitle: {
            type: String
        },
        offerImgUrl: {
            type: String
        }
    },
    bookQuarry: {
        quarryId: {
            type: String,
            required: true
        },
        quarryTitle: {
            type: String
        },
        quarryImgUrl: {
            type: String
        }
    },
    timeCreated: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trade', TradeSchema);