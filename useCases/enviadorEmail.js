const nodemailer = require("nodemailer");
// usa o nodemailer para enviar emaiis.
module.exports = async function enviadorEmail(to, otpCode) {
  //cria a conexão
  const transporter = await nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //evnia o email
  await transporter
    .sendMail({
      from: ' "fabio" <fabio.thompson44@outlook.com>',
      to: to,
      subject: "your code verification",
      text: `your code verification is ${otpCode} and u can use for login verification`,
    })
    .catch((err) => {
      console.error("erro ao enviar email", err);
    });
};
