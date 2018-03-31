require('./src/server/config/config.ts');

import * as express from 'express';
import * as path from 'path';

var { authenticate } = require('./src/server/middleware/authenticate');
const { mongoose } = require('./src/server/db/mongoose');
var { ObjectID } = require('mongodb');
var bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

import { IUser } from './src/shared/models/IUser';
import User from './src/server/models/user';

var app: express.Application = express();
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
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

//#region API Routes
    app.post('/api/user', (request, response) => {
        console.log('POST /api/user', request.body);
        var body = _.pick(request.body, ['username', 'email', 'password', 'rol']);
        var user: any = new User(body);
        user.save().then(() => {
            return user.generateAuthToken().then(token => {
                // Respond to the client sending back the token in the 'x-auth' header.
                response.header('x-auth', token).status(200).send(user);
            }, err => {
                response.status(400).send('Could not generate token');
            });
        }, (err) => {
            console.log('Error saving user');
            if (err.code == 11000) {
                console.log('Duplicate value');
                let invalidField = err.message.split('index: ')[1].split('_1')[0];
                console.log('Invalid field:', invalidField);
                switch(invalidField) { 
                    case 'username': { 
                        response.status(409).send('Username already taken');
                        break; 
                    } 
                    case 'email': { 
                        response.status(409).send('An account with that email address already exists');
                        break; 
                    } 
                    default: { } 
                 } 
            }
        });
    });

    // POST /api/users/login
    // Every time a user logs in a new token will be generated for that user.
    app.post('/api/users/login', (request, response) => {
        var body = _.pick(request.body, ['username', 'email', 'password']);
        // We will use a custom model method.
        (<any>User).findByCredentials(body.username, body.email, body.password).then((user) => {
            // Send Back the user.
            return user.generateAuthToken().then((token) => {
                response.header('x-auth', token).status(200).send(user);
            });
        }).catch((error) => {
            response.status(404).send(error);
        });
    });

    // DELETE /api/users/me/token
    app.delete('/users/me/token', authenticate, (request: any, res) => {
        request.user.removeToken(request.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    });
//#endregion

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = { app };