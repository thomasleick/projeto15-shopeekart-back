const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailWithSendgrid(to, subject, text, html) {
    const msg = {
        to,
        from: 'shopeekart@mail.com', // Change to your verified sender
        subject,
        text,
        html,
    }
    return sgMail.send(msg)
}

module.exports = { sendEmailWithSendgrid }
