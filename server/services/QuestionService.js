const QuestionModel = require('../models/QuestionModel');
const sendQuestionToEmail = require('../utils/sendQuestionToEmail');

class QuestionService {
    async sendQuestion(data) {
        QuestionModel.create(data, function (err) {
            if (err) return console.error(err);
            sendQuestionToEmail(data);
        });
    }
}

module.exports = new QuestionService()