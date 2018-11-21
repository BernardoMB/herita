require('./src/server/config/config.ts');

import * as express from 'express';
import * as path from 'path';
import * as chalk from 'chalk';

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
app.use(function (request, response, next) {
    // set headers to allow cross origin request.
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    response.header('Access-Control-Expose-Headers', 'x-auth');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Run the app by serving the static files in the dist directory.
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html so that Angular's PathLocationStrategy can be used.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

//#region API Routes

// POST /api/user
// Create a user
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
// Every time a user logs in a new token will be generated for that user
app.post('/api/users/login', (request, response) => {
    console.log(chalk.default.greenBright('POST /api/user/login'));
    console.log('Request body: ', request.body);
    const credentials: ILoginModel = _.pick(request.body, ['credential', 'password']);
    console.log('Trying login with credentials:', credentials);
    // We will use a custom model method
    (<any>User).findByCredentials(credentials.credential, credentials.password).then((user) => {
        // Send back the user and a new token
        return user.generateAuthToken().then((token) => {
            console.log('Generated token:', token);
            setTimeout(() => {
                response.header('x-auth', token).status(200).json({ user });
            }, 0);
        });
    }).catch((error) => {
        response.status(404).send(error);
    });
});

// POST /api/users/loginByIdAndToken
// Login but do not generate a new token
app.post('/api/users/loginByIdAndToken', (request, response) => {
    console.log('POST /api/user/loginByIdAndToken');
    console.log('Request body: ', request.body);
    const headertoken = request.header('x-auth');
    console.log('TAKEN:', headertoken);
    const userId: string = <string>request.body.userId;
    const token: string = <string>request.body.token;
    console.log('Trying login with id and token');
    // We will use a custom model method
    (<any>User).findByToken(token).then((user) => {
        // Send back the user and the used token
        console.log('Used token:', token);
        setTimeout(() => {
            response.header('x-auth', token).status(200).json({ user });
        }, 0);
    }, (error) => {
        response.status(404).send(error);
    });
});

// DELETE /api/user/me
app.delete('/api/user/me/token/:id', authenticate, (request: any, response) => {
    console.log('REQUEST TOKEN: ', request.token);
    request.user.removeToken(request.token).then(() => {
        console.log('SENDING STATUS 200 RESPONSE ');
        response.status(200).json({});
    }, (error) => {
        response.status(400).send(error);
    });
});
//#endregion

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = { app };
