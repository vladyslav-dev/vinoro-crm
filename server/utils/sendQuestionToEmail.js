const nodemailer = require('nodemailer');
const questionTranslation = require('./questionTranslation');

module.exports = (data) => {

    const questionLanguage = data.lang || 'uk';


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'vinorosend@gmail.com',
        pass: 'mtvyrpibtzlkpoec'
        }
    });

    transporter.sendMail({
        from: 'vinorosend@gmail.com',
        to: `${data.email}, vinorosend@gmail.com, grigovlad09112002@gmail.com`,
        subject: `vinoro.shop - ${questionTranslation[questionLanguage].contactForm}, «${data.email}»`,
        html: `<p>${questionTranslation[questionLanguage].yourMessage} <b>«${data.message}»</b> ${questionTranslation[questionLanguage].send}</p>`
    }, function(error, info){
        if (error) {
         console.log(error);
        } else {
         console.log('Email sent: ' + info.response);
        }
    });
}

