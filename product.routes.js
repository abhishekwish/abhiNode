module.exports = (app) => {
    const products = require('./product.controller.js');
    const users = require('./user.controller.js');
    // Create a new Product
    app.post('/products',users.isAuthenticated, products.create);

    // Retrieve all Products
    app.get('/products', products.findAll);

    // Retrieve a single Product with productId
    app.get('/products/:productId', products.findOne);

    // Update a Note with productId
    app.put('/products/:productId',users.isAuthenticated , products.update);

    // Delete a Note with productId
    app.delete('/products/:productId',users.isAuthenticated , products.delete);

    app.get('/download/:file(*)',products.downloads);
}
