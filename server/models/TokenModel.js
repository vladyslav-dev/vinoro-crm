const { Schema, model } = require('mongoose')

const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'adminUser'
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {collection: 'adminTokens'})

module.exports = model('adminTokens', TokenSchema)