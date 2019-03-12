const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: { type : String , unique : true, required : true, dropDups: true },
    description: { type : String , required : true },
    price: { type : Number , required : true },
    company: { type : String , required : true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', ProductSchema);