import { UserBusiness } from './../business/UserBusiness';
import { IUserModel } from './../model/interfaces/UserModel';
import { Request, Response } from 'express';
import { IBaseController } from './interfaces/base/BaseController';
import * as sanitize from 'mongo-sanitize';
import { compareSync } from 'bcryptjs';

export class UserController implements IBaseController<UserBusiness> {

    public create(req: Request, res: Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            const userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({message: 'Error creando usuario', error});
                } else {
                    res.json({ user: result});
                }
            });
        } catch (error) {
            console.error(`Error creating user ${error}`);
            res.status(400).json({message: 'Error creando usuario', error});
        }
    }

    public update(req: Request, res: Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            const _id: string = req.params.id;
            const userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
                if (error) {
                    return res.status(500).json({message: 'Error actualizando usuario', error});
                }
                if (!result) {
                    return res.status(404).json({
                        message: 'Imposible actualizar usuario inexistente',
                        error: new Error('User not found')
                    });
                }
                res.json({ updated: result.ok === 1});
            });
        } catch (error) {
            console.error(`Error updating user ${error}`);
            res.status(400).json({message: 'Error actualizando usuario', error});
        }
    }

    public delete(req: Request, res: Response): void {
        try {
            const _id: string = req.params.id;
            const userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
                if (error) {
                    res.status(500).json({message: 'Error eliminando usuario', error});
                } else {
                    res.json({ id: _id});
                }
            });
        } catch (error) {
            console.error(`Error deleting user ${error}`);
            res.status(400).json({message: 'Error eliminando usuario', error});
        }
    }

    public retrieve(req: Request, res: Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            const _id: string = req.params.id;
            const userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                if (error) {
                    res.status(500).json({message: 'Error cargando usuarios', error});
                } else {
                    res.json({ users: result});
                }
            });
        } catch (error) {
            console.error(`Error retrieving users ${error}`);
            res.status(400).json({message: 'Error cargando usuarios', error});
        }
    }

    public findById(req: Request, res: Response): void {
        try {
            const _id: string = req.params.id;
            const userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result) => {
                if (error) {
                    return res.status(500).json({message: 'Error cargando usuario', error});
                }
                if (!result) {
                    return res.status(404).json({message: 'Usuario inexistente', error: new Error('User not found')});
                }
                res.json({ user: result});
            });
        } catch (error) {
            console.error(`Error getting user ${error}`);
            res.status(400).json({message: 'Error cargando usuario', error});
        }
    }

    public login(req: Request, res: Response): void {
        try {
            const password = sanitize(req.body.password);
            const userName = req.body.userName;
            const userBusiness = new UserBusiness();
            userBusiness.login(userName, password, (error, result) => {
                if (error || typeof password === 'object') {
                    return res.status(401).json({message: 'Error iniciando sesión', error});
                }
                const user = result.user;
                if (!user || !compareSync(password, user.password)) {
                    return res
                        .status(401)
                        .json({message: 'Credenciales incorrectas', error: new Error('Username or password do not match')});
                }
                if (!user.active) {
                    return res.status(401).json({message: 'Usuario no está activo', error: new Error('User is not active')});
                }
                res.header('x-auth', result.token).json({ user });
            });
        } catch (error) {
            console.error(`Error logging in ${error}`);
            res.status(400).json({message: 'Error iniciando sesión', error});
        }
    }
}
