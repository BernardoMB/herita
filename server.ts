// Set environment variables.
const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
    const config = require('./src/server/config/config.json');
    const envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

import * as express from 'express';
import * as path from 'path';
const cors = require('cors');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./src/server/db/mongoose');
import { Application } from 'express';
import { IUser } from './src/shared/models/IUser';
import User from './src/server/models/user';

var app: Application = express();
var port = process.env.PORT;

app.use(cors());

// Middleware.
//var {authenticate} = require('./middleware/authenticate');
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // set headers to allow cross origin request.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Run the app by serving the static files in the dist directory.
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html so that Angular's PathLocationStrategy can be used.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/users', (request, response) => {
    var body = _.pick(request.body, ['username', 'password', 'rol']);
    var user = new User(body);
    // Save the incomin user from the request.
    user.save().then((doc) => {
        // return a promise whose resolve case gives us the token just created.
        response.send(doc);
    }).catch((error) => {
        response.status(400).send(error);
    });
});


app.post('/api/users/login', (request, response) => {
    /* var body = _.pick(request.body, ['email', 'password']);
    // We will use a custom model method.
    User.findByCredentials(body.email, body.password).then((user) => {
      // Send Back the user.
      //response.status(200).send(user);
      // Better do the following.
      return user.generateAuthToken().then((token) => {
        response.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      response.status(400).send();
    }); */
    const fakeUser: IUser = {
        _id: '123',
        username: 'Omonopineme',
        password: '9058',
        rol: 1
    }
    response.send();
});


app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = {app};