const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "mail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

module.exports = { sendEmail };