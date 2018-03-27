import * as process from 'process';

var mongoose = require('mongoose');

// Tell mongoose to use promises.
mongoose.Promise = global.Promise;

// Connect to the database.
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/herita');

// Export the connection.
module.exports = {mongoose};