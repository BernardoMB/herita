require('./src/server/config/config.ts');

import * as express from 'express';
import * as path from 'path';

const { authenticate } = require('./src/server/middleware/authenticate');
const { mongoose } = require('./src/server/db/mongoose');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

import { IUser } from './src/shared/models/IUser';
import User from './src/server/models/user';
import { ILoginModel } from './src/app/core/containers/login/login.component';

const app: express.Application = express();
const port = process.env.PORT;

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
    const body = _.pick(request.body, [
        'username',
        'email',
        'password',
        'rol',
        'firstTimeLogin',
        'verified'
    ]);
    const user: any = new User(body);
    user.save().then(() => {
        console.log('User saved');
        return user.generateAuthToken().then(token => {
            // Respond to the client sending back the token in the 'x-auth' header.
            response.status(200).header('x-auth', token).send(user);
        }, err => {
            response.status(400).send('Could not generate token');
        });
    }, (err) => {
        console.log('Error saving user', err);
        if (err.code === 11000) {
            console.log('Duplicate value');
            const invalidField = err.message.split('index: ')[1].split('_1')[0];
            console.log('Invalid field:', invalidField);
            switch (invalidField) {
                case 'username': {
                    response.status(409).send('Username already taken');
                    break;
                }
                case 'email': {
                    response.status(409).send('An account with that email address already exists');
                    break;
                }
                default: {
                    response.status(409).send('Email or username already taken');
                    break;
                }
            }
        }
    });
});

// POST /api/users/login
// Every time a user logs in a new token will be generated for that user.
app.post('/api/users/login', (request, response) => {
    console.log('POST /api/user/login');
    console.log('Request body: ', request.body);
    const credentials: ILoginModel = _.pick(request.body, ['credential', 'password']);
    console.log('Trying login with credentials:', credentials);
    // We will use a custom model method.
    (<any>User).findByCredentials(credentials.credential, credentials.password).then((user) => {
        // Send Back the user.
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).status(200).send(user);
        });
    }).catch((error) => {
        response.status(404).send(error);
    });
});

// DELETE /api/user/me
app.delete('/api/user/me/token/:id', authenticate, (request: any, res) => {
    console.log('REQUEST TOKEN: ', request.token);
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
