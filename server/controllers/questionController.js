const QuestionService = require('../services/QuestionService');

module.exports.send = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            await QuestionService.sendQuestion(data);
            res.send("Success")
        }
    } catch (error) {
        next(error)
    }
}