const nodemailer = require('nodemailer');
const translation = require('./mailTranslation');
const createMailHTML = require('./createMailHTML');

module.exports = (data, totalPrice) => {

    const mailLanguage = data.mailLanguage || 'uk';

   const html = createMailHTML(data, totalPrice, mailLanguage)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'vinorosend@gmail.com',
        pass: 'mtvyrpibtzlkpoec'
        }
    });

    transporter.sendMail({
        from: 'vinorosend@gmail.com',
        to: `vinorosend@gmail.com, grigovlad09112002@gmail.com, ${data.email}`,
        subject: `vinoro.shop - ${translation[mailLanguage].Order} №1652110161250 ${translation[mailLanguage].confirmed}!`,
        html: html
    }, function(error, info){
        if (error) {
         console.log(error);
        } else {
         console.log('Email sent: ' + info.response);
        }
    });
}

