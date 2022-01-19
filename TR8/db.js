var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tr8');

var userSchema = new mongoose.Schema({
    nome: String,
    cpf: String
}, { collection: 'usercollection' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }