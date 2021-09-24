const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_name: { type : String , unique : true, required : true, dropDups: true },
    password: { type : String , required : true },
    name: {type : String , unique : true, required : true, dropDups: true },
    age: {type : Number , required : true },
    address:{type : String , required : true } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);