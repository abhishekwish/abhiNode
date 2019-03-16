const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product_name: { type : String , unique : true, required : true, dropDups: true },
    user_id: { type : String , required : true },
    product_id: {type : String , required : true},
    order_method: {type : String , required : true },
    order_status:{type : String , required : true },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Orders', OrderSchema);