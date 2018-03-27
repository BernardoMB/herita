import { UserSchema } from './../data-access/schemas/UserSchema';
import { IUserModel } from './../model/interfaces/UserModel';
import { RepositoryBase } from './base/RepositoryBase';

export class UserRepository extends RepositoryBase<IUserModel> {
    constructor() {
        super(UserSchema);
    }

    public findByUsername (userName: string, callback: (error: any, result: IUserModel) => void): void {
        this._model.findOne({ userName }, callback);
    }
}

