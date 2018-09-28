import * as process from 'process';

const mongoose = require('mongoose');

// Tell mongoose to use promises
mongoose.Promise = global.Promise;

// Connect to the database
console.log('MongoDB URI', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(connection => {
    console.log(`Succesful connection to ${connection.connections[0].name} database`);
}).catch(error => {
    console.log(`MongoDB Connection Error: ${error}`);
});

// Export the connection.
module.exports = {mongoose};
