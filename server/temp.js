const UserService = require('./services/UserService');
require('dotenv').config()
const mongoose = require('mongoose')

const addUser = async (username, login, password) => {

    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.12if0.mongodb.net/vinoro-redesign', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        const userData = await UserService.registration(username, login, password);
        console.log("User added!")
        console.log(userData);
    } catch (err) {
        console.log(err)
    }

}

addUser('Default admin', 'admin', 'admin');

module.exports = 'test';