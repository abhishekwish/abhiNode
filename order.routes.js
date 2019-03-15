module.exports = (app) => {
    const orders = require('./order.controller.js');
    const users = require('./user.controller.js');
    // Create a new Order
    app.post('/create-order', orders.create);

   
    // Retrieve all orders

    app.get('/orders',users.isAuthenticated, orders.findAll);

    // Retrieve a single Product with productId
    app.get('/orders/:orderId',users.isAuthenticated, orders.findOne);

    // Update a Note with productId
    app.put('/orders/:orderId',users.isAuthenticated, orders.update);

    // Delete a Note with productId
    app.delete('/orders/:orderId', orders.delete);
 
    
    
}
