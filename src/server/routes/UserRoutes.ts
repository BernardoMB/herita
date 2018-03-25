import { authenticate } from './middlewares/authentication';
import { UserController } from '../controllers/UserController';
import {Router} from 'express';

const router = Router();

export class UserRoutes {

    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }

    get routes(): Router {
        const controller = this._userController;
        router.post('/login', controller.login);
        router.post('', controller.create);
        router.use(authenticate);        
        router.get('', controller.retrieve);
        router.put('/:id', controller.update);
        router.get('/:id', controller.findById);
        router.delete('/:id', controller.delete);

        return router;
    }
}
