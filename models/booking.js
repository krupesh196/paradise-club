const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    room: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    bed: {
        type: String,
    },
    type: {
        type: String,
    },
    totalamount: {
        type: Number,
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }

}, {
    timestamps: true,
})

const bookingmodel = mongoose.model('booking', bookingSchema);

module.exports = bookingmodel;