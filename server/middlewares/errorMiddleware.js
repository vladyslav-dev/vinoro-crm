const ApiError = require('../exceptions/apiError')

module.exports = function(err, req, res, next) {
    console.log(err)
    if (err instanceof ApiError) {
        console.log('--------- error middleware ++++++++++=')
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: "Server error. Something went wrong("})
}