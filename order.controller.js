const Order = require('./order.model.js');
var jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.create = (req, res) => {
    // Request validation
    const orderData = schema.validate(req.body);
    console.log(orderData.error);
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
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find and update product with the request body
    User.findOneAndUpdate,(req.params.userId, {
        name: req.body.name, 
        age: req.body.age,
        address: req.body.address,
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => { 
    User.findOneAndDelete(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

var schema = Joi.object().keys({
    product_name: Joi.string().min(3).max(50).required().label("Please Enter valid product Name"),
    user_id: Joi.number().integer().required().label("Please Enter valid user id "),
    product_id: Joi.number().integer().required().label("Please Enter valid user id "),
    order_method: Joi.string().min(2).max(10).required().label("Please Enter valid Order Method"),
    order_status: Joi.string().min(2).max(6).required().label("Please Enter valid Order Status"),
});

