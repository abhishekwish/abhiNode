const User = require('./user.model.js');
var jwt = require('jsonwebtoken');
var joi = require('joi');

exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    console.log(req.body.user_name);
    console.log(req.body.password);
    
    if(!req.body.user_name && !req.body.password){
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
   
    // Create a User
    const users = new User({
        user_name: req.body.user_name, 
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    });
    // Save user in the database
    users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

exports.login = (req, res) => {
    // Request validation
    if(!req.body.user_name && !req.body.password){
        return res.status(400).send({
            message: "user & password can not be empty"
        });
    }
     // login a user
        let user_name = req.body.user_name;
        let password = req.body.password;
    

    User.findOne({'user_name': user_name}, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user) {
            if (user.password !== password) {
                res.status(401).send({
                    message: 'Wrong password.'
                });
            } else {

                token = generateJwt(user._id,user_name);
                res.status(200);
                res.json({
                    'token': token,
                    'user': user,
                    'message': "User successfully loggidin"
                });
            }
        } else {
            res.status(404).send({
                message: 'No user was found.'
            });
        }
    });
   
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
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

function generateJwt(id,userName)
{
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({
        _id: id,
        username: userName,
    }, "xyzabhizyx", {expiresIn: "1 hours"});
}

exports.isAuthenticated = (req, res, next) => {
     if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized Request');
    }else{//jwt.sign()
        let payload = jwt.verify(token,'xyzabhizyx',(err,token1)=>{
             if(err){
                return res.status(401).send('Unauthorized Request');
             } else {
                req.userId=token1.subject;
                next();         
             }
         });
    }
};
