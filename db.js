const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://krupesh1964:1964@cluster0.uq93ymj.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true
})

var connection = mongoose.connection

connection.on('error', () => {
    console.log('MongoDB connection failed!')
})

connection.on('connected', () => {
    console.log('MongoDB connected Successfuly!')
})

module.exports = mongoose