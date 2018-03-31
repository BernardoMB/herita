import * as mongoose from 'mongoose';
import { IUser } from '../../shared/models/IUser';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export interface UserInterface extends IUser, mongoose.Document {
    _id: string;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        trim: true,
        minlength: 1,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: 6
    },
    rol: {
        type: Number,
        required: [true, 'Rol required']
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Define the INSTANCE METHODS.

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, process.env.JWT_SECRET).toString();
    user.tokens.push({
        access,
        token
    });
    // Update and save the user object.
    // Return a promise: If there is no error saving, then pass the token to the next .then() call.
    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    // Remember that update returns a promise if no then() callback provided.
    return user.update({
        // MongoDB operator '$pull' let us remove items from an array that match certain criterea. 
        $pull: {
            // Define what we want to pull.
            tokens: { token }
        }
    });
};

// Define the MODEL METHODS.

// Hash the password before storeing it.
// Visit the documentation to see how 'pre' operates.
UserSchema.pre('save', function (next) {
    // Get acces to the individual document.
    var user = this;
    // To do not rehash the value every time we update the doc we should use 'isModified()'.
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject();
        });
        // Alternatively.
        //return Promise.reject();
    }
    // Return a promise so we can add a .then() call to the findByToken() call. 
    return User.findOne({
        '_id': decoded._id,
        // alternatively.
        //_id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (username, email, password) {
    var User = this;
    return User.findOne({$or: [
        {username: username},
        {email: email}
    ]}).then((user) => {
        if (!user) {
            return Promise.reject('That username does not exists');
        }
        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject('Incorrect password');
                }
            });
        });
    });
};

// Pass the 'UserSchema'.
const User = mongoose.model<UserInterface>('user', UserSchema);

export default User;
