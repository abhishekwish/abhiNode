module.exports = (app) => {
    const users = require('./user.controller.js');
    //const Joi = require('joi');
    //const expressJoi = require('express-joi-middleware');
    // Create a new Product
    app.post('/create-user', users.create);

    app.post('/user-login', users.login);
    // Retrieve all Products

    app.get('/users',users.isAuthenticated, users.findAll);

    // Retrieve a single Product with productId
    app.get('/users/:userId',users.isAuthenticated, users.findOne);

    // Update a Note with productId
    app.put('/users/:userId',users.isAuthenticated, users.update);

    // Delete a Note with productId
    app.delete('/users/:userId', users.delete);
 
    /*var schema = Joi.object().keys({
        user_name: Joi.string().min(4).max(50).required().label("Please Enter valid User_Name"),
        password: Joi.string().min(4).max(14).required().label("Please Enter valid Password "),
        name: Joi.string().min(4).max(50).required().label("Please Enter valid Name"),
        age: Joi.number().integer().min(16).max(100).default(20).label("Please Enter valid age"),
        address: Joi.string().min(3).max(250).required().label("Please Enter valid address"),
    });
    */
    
}
