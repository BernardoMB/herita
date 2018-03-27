import { ObjectId, ObjectID } from 'bson';
import { IUserModel } from './interfaces/UserModel';

export class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }

    get userName (): string {
        return this._userModel.userName;
    }

    get email (): string {
        return this._userModel.email;
    }

    get organizationId (): ObjectID {
        return this._userModel.organizationId;
    }

    get subOrganizationId (): ObjectID {
        return this._userModel.subOrganizationId;
    }

    get token (): string {
        return this._userModel.token;
    }

    get quota (): number {
        return this._userModel.quota;
    }

    get quotaLimit (): number {
        return this._userModel.quotaLimit;
    }

    get firstName (): string {
        return this._userModel.firstName;
    }

    get lastName (): string {
        return this._userModel.lastName;
    }

    get isAdmin (): boolean {
        return this._userModel.isAdmin;
    }

    get isSubAdmin (): boolean {
        return this._userModel.isAdmin || this._userModel.isSubAdmin;
    }

    get active (): boolean {
        return !!this._userModel.active;
    }

    get createdAt (): Date {
        return this._userModel.createdAt;
    }

    get updatedAt (): Date {
        return this._userModel.updatedAt;
    }

}
