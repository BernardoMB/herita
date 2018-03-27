import { UserRoutes } from './../UserRoutes';
import * as express from 'express';
import * as path from 'path';

export class Api {

    public static initialize(app: express.Application): void {
        app.use('/api/user', new UserRoutes().routes);
    }

    public static serveClient(app: express.Application): void {
        // Serve the compiled angular application
        app.use(express.static(path.join(__dirname, 'dist')));

        // If no API Route was matched, handle control to Angular Application
        app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../../../dist/index.html')));
    }
}
