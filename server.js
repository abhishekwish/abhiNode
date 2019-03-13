const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');
var logger = require('./logger');
const app = express();
const multerapp  =   require('multer');
const uploads     = multerapp();
app.use(helmet());
app.disable('x-powered-by');
// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(uploads.array());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./product.routes.js')(app);
require('./user.routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
    logger.accessLog.info("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    logger.errorLog.info('Could not connect to the database. Exiting now...', err);
    process.exit();
});
mongoose.set('useCreateIndex', true);
// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Abhi Product app"});
});

// listen on port 3000
app.listen(config.serverport, () => {
    logger.accessLog.info("info", "App listening at localhost:3000");
    console.log("Server is listening on port 3000");
});