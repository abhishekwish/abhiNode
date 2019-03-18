const Order = require('./order.model.js');
const User = require('./user.model.js');
var jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.create = (req, res) => {
    // Request validation
    const orderData = schema.validate(req.body);
    if (orderData.error) {
        return res.status(403).send({
            result:orderData.error.ValidationError,
            message: "order content can not be empty"
        });
      }
    req.body = orderData.value;
    // Create a Order
    const Orders = new Order({
        product_name: req.body.product_name, 
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        order_method: req.body.order_method,
        order_status: req.body.order_status
    });
    // Save user in the database
    Orders.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the Order."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {

    Order.find({}).populate({
        path: 'chapterid',
        populate: {
            path: 'subjectid',
            populate: { path: 'classid', model: 'Addclass' }
        }
  });
  //db.orders.aggregate([{$lookup: {from: "users",localField: "user_id",foreignField: "_id",as: "usersData"}}])
  Order.aggregate([{      
    $lookup: {
        from: "users", // collection name in db
        localField: "user_id",
        foreignField: "_id",
        as: "usersData"
    }},
    {      
        $lookup: {
            from: "products", // collection name in db
            localField: "product_id",
            foreignField: "_id",
            as: "productData"
        }},
        { $unwind: "$usersData"},
        { $unwind: "$productData"},
]).exec(function(err, orders) {
    // students contain WorksnapsTimeEntries
    if(err){
        console.log(err);
    }
    res.send(orders);
});

/*
    Order.find().populate('Users Products')
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    }); */
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });            
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.orderId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    const orderData = schema.validate(req.body);
    if (orderData.error) {
        return res.status(403).send({
            result:orderData.error.ValidationError,
            message: "order content can not be empty"
        });
      }
    req.body = orderData.value;
    // Find and update product with the request body
    Order.findOneAndUpdate,(req.params.orderId, {
        product_name: req.body.product_name, 
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        order_method: req.body.order_method,
        order_status: req.body.order_status
        
    }, {new: true})
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send(orders);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.orderId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => { 
    Order.findOneAndDelete(req.params.orderId)
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.orderId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.orderId
        });
    });
};
 
var schema = Joi.object().keys({
    product_name: Joi.string().min(3).max(50).required().label("Please Enter valid product Name"),
    user_id: Joi.string().min(3).max(50).required().label("Please Enter valid user id "),
    product_id: Joi.string().min(3).max(50).required().label("Please Enter valid user id "),
    order_method: Joi.string().min(2).max(10).required().label("Please Enter valid Order Method"),
    order_status: Joi.string().min(2).max(10).required().label("Please Enter valid Order Status"),
});

