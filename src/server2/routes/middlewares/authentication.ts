import { UserSchema } from './../../data-access/schemas/UserSchema';
import { Request, Response} from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { JWT_HASH } from './../../config/secrets';

let HASH;
if (process.env.NODE_ENV !== 'production') {
  HASH = JWT_HASH;
} else {
  HASH = process.env.JWT_HASH;
}


export function authenticate (req: Request, res: Response, next: any) {
    const token = req.header('x-auth');
    let decoded = undefined;
    try {
        decoded = verify(token, HASH);
    } catch (err) {
        decoded = '0';
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({
                message: 'Sesión ha expirado, por favor vuelva a iniciar sesión',
                error : new Error('Token expired')
            });
        }
    }
    if (!decoded || !decoded.data) {
        return res.status(401).json({
            message: 'Sesión invalida, por favor vuelva a iniciar sesión',
            error : new Error('Token is invalid')
        });
    }
    UserSchema.findOne({_id: decoded.data.id, token}, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'Usuario inexistente', error : new Error('User whas not found in db')});
        }
        next();
    });
}

export function adminAuthenticate (req: Request, res: Response, next: any) {
    const token = req.header('x-auth');
    let decoded = undefined;
    try {
    decoded = verify(token, HASH);
    } catch (err) {
    decoded = '0';
    if (err instanceof TokenExpiredError) {
        return res.status(401).json({
            message: 'Sesión ha expirado, por favor vuelva a iniciar sesión',
            error : new Error('User whas not found in db')
        });
    }
    }
    UserSchema.findOne({_id: decoded.data.id, token}, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'Usuario inexistente', error : new Error('User whas not found in db')});
        }
        if (!user.isSubAdmin && !user.isAdmin) {
            return res.status(401).
                    json({
                        message : 'Error obteniendo información',
                        error : { message : 'No se encuentra autorizado'}
                    });
        }
        next();
    });
}
