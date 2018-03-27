import { Document } from 'mongoose';
import { ObjectID } from 'bson';

export interface IUserModel extends Document {
    userName: string;
    email?: string;
    organizationId: ObjectID;
    subOrganizationId: ObjectID;
    password?: string;
    token?: string;
    quota: number;
    quotaLimit: number;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isSubAdmin: boolean;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    generateToken(): Promise<string>;
}

