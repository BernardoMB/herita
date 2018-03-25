import { IUserModel } from './../model/interfaces/UserModel';
import { UserRepository } from './../repository/UserRepository';
import { IUserBusiness } from './interfaces/IUserBusiness';


export class UserBusiness implements IUserBusiness {

    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    create (item: IUserModel, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: Array<IUserModel>) => void) {
         this._userRepository.retrieve(callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {
        this._userRepository.findById(_id, (err, res: any) => {
            if (err || !res) {
                callback(err, res);
            } else {
                this._userRepository.update(res._id, item, callback);
            }
        });
    }

    delete (_id: string, callback: (error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findById(_id, callback);
    }

    login(userName: string, password: string, callback: (error: any, result: {user: IUserModel, token: string}) => void) {
        this._userRepository.findByUsername(userName, (err: any, res: IUserModel) => {
            if (err || !res) {
                callback(err, {user: res, token: null});
            } else {
                res.generateToken().then( token => {
                    callback(null, {user: res, token});
                });
            }
        });
    }

}
