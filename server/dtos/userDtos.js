module.exports = class UserDto {
    id
    username
    login

    constructor(model) {
        this.id = model._id
        this.avatar = model.avatar
        this.username = model.username
        this.login = model.login
    }
}