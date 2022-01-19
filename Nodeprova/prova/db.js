var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/prova');

var userSchema = new mongoose.Schema({
    aeroporto: String,
    cidade: String
}, { collection: 'aerocollection' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }