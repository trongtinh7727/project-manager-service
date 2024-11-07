const nodemailer = require('nodemailer');
const confirmEmailHTML = require('../templates/emailTemplate')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'IIEX - Project Manager',
        to: options.email,
        subject: options.subject,
        html: options.content,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
