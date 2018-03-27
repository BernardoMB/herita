const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    rol: {
        type: Number,
        required: [true, 'Rol required']
    }
});

const User = mongoose.model('user', UserSchema);

export default User;
