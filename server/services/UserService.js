const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const TokenService = require('./TokenService')


const UserDto = require('../dtos/userDtos')
const ApiError = require('../exceptions/apiError')

class UserService {
    async registration(username, login, password) {
        const candidate = await UserModel.findOne({ login })

        if (candidate) { // check login on existing
            throw ApiError.BadRequest(`User with login ${login} alreay exist!`)
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const newUser = await UserModel.create({
            username,
            login,
            password: hashPassword,
        })

        await newUser.save()

        const userDto = new UserDto(newUser) // id, login
        const tokens = TokenService.generateTokens({ ...userDto }) // {accessToken, refreshToken}

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            newUser
        }
    }

    async login(login, password) {
        const user = await UserModel.findOne({ login })
        if (!user) {
            throw ApiError.BadRequest("No user with such login")
            // throw new Error("No user with such login")
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
         //   throw new Error("Password incorrect")
           throw ApiError.BadRequest("Password incorrect")
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return await UserModel.find()
    }

}

module.exports = new UserService()