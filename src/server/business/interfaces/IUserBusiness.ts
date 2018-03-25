import { IUserModel } from './../../model/interfaces/UserModel';
import { IBaseBusiness } from './base/BaseBusiness';

export interface IUserBusiness extends IBaseBusiness<IUserModel> {
    login: (username: string, password: string, callback: (error: any, result: {user: IUserModel, token: string}) => void) => void;
}
