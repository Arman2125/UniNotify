const nodemailer = require("nodemailer");
const ExpressError = require("../ExpressError");

const sendMail = async (to, subject, html) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: `"UniNotify" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.log("Email Error : ", err);
  }
};

module.exports = sendMail;
