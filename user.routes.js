module.exports = (app) => {
    const users = require('./user.controller.js');

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
}
