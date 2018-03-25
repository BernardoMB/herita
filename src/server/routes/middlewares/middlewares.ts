import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
//const helmet = require('helmet');
//const sslRedirect = require('heroku-ssl-redirect');
import { Application, Request, Response } from 'express';

export class Middlewares {

    public static initialize(app: Application): void {
        app.use(morgan('dev', {
            skip: (req: Request, res: Response) => res.statusCode < 400,
            stream: process.stderr
        }));
        app.use(morgan('dev', {
            skip: (req: Request, res: Response) => res.statusCode >= 400,
            stream: process.stdout
        }));
        //app.use(helmet());
        //app.use(sslRedirect());
        app.use(bodyParser.json({limit: '50mb'}));
    }
}
