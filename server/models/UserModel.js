const { Schema, model } = require('mongoose')

const UserModel = new Schema({
    username: {
        type: String,
        default: 'Admin',
    },
    avatar: {
        type: String,
        default: ''
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'adminUser'});

module.exports = model('adminUser', UserModel)