const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_name: String,
    password: String,
    name: String,
    age: Number,
    address:String 
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);