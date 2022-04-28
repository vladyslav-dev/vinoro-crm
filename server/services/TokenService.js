const jwt = require('jsonwebtoken')
const TokenModel = require('../models/TokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESSES_SECRET, { expiresIn: '1d' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessesToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESSES_SECRET);
            return userData;
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await TokenModel.create({ user: userId, refreshToken })

        return token.save()
    }

    async removeToken(refreshToken) {
        await TokenModel.deleteOne({ refreshToken })
    }

    async findToken(refreshToken) {
        return await TokenModel.findOne({ refreshToken })
    }

}

module.exports = new TokenService()