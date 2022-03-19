const ApiError = require('../exceptions/apiError')
const TokenService = require('../services/TokenService')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessesToken = authorizationHeader.split(' ')[1]

        if (!accessesToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = TokenService.validateAccessesToken(accessesToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (err) {
        return next(ApiError.UnauthorizedError())
    }
}