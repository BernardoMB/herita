import { IUserModel } from './../../model/interfaces/UserModel';

import { Model, model, Schema } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_HASH } from './../../config/secrets';

let HASH;
if (process.env.NODE_ENV !== 'production') {
  HASH = JWT_HASH;
} else {
  HASH = process.env.JWT_HASH;
}


const schema: Schema = new Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    subOrganizationId: { type: Schema.Types.ObjectId, ref: 'SubOrganization' },
    password: { type: String },
    token: { type: String, required: false },
    quota: { type: Number },
    quotaLimit: { type: Number },
    firstName: String,
    lastName: String,
    isAdmin: { type: Boolean, default: false },
    isSubAdmin: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
}).pre('save', function(next) {
    const user = this;
    if (user._doc) {
        const now = new Date();
        const doc = <IUserModel>this._doc;
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.updatedAt = now;
    }
    if (user.isModified('password')) {
      genSalt(10, (err, salt) => {
        hash(user.password, salt, (error, newhash) => {
          user.password = newhash;
          next();
        });
      });
    } else {
      next();
      return user;
    }
  });

  schema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.token;
    return obj;
  }

  schema.methods.generateToken = function (): Promise<string> {
    const usr = this;
    const auth: any = {
      id : usr._id,
      access : 'auth'
    }
    const token = sign({exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: auth}, HASH);
    usr.token = token;
    return usr.save().then(() => {
        return token;
    });
  }

  export const UserSchema: Model<IUserModel> = model<IUserModel>('User', schema);
