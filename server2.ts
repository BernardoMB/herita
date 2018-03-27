import * as path from 'path';
import * as express from 'express';
const cors = require('cors');

import { Db } from './src/server2/data-access/config';
import { Api } from './src/server2/routes/base/Api';
import { Middlewares } from './src/server2/routes/middlewares/middlewares';

const PORT = process.env.PORT || 300;
const app: express.Application = express();
const db = new Db();

app.use(cors());

// Connect to the mongodb database
db.connect();

// Initialize api middlewares
Middlewares.initialize(app);

app.use(function(req, res, next) {
    // set headers to allow cross origin request.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Initialize all api routes
Api.initialize(app);

// Serve the angular client when no other routes are matched
app.use(express.static(path.join(__dirname, 'dist')));

// If no API Route was matched, handle control to Angular Application
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

app.listen(PORT, () => console.log(`Server is now running @ port: ${PORT}`));

