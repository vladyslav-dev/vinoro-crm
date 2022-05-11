const mongoose = require('mongoose');

const QuestionModel = new mongoose.Schema({
    email: String,
    message: String,
    lang: String
}, {collection: 'questions'});

module.exports = mongoose.model('questions', QuestionModel)