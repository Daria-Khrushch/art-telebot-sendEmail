import nodemailer from "nodemailer";

// const email = process.env.EMAIL;
// const emailTo = process.env.EMAIL_TWO;
// const pass = process.env.EMAIL_PASS;

const email = "dariakh.test@gmail.com";
const emailTo = "daria21khrushch@gmail.com";
const pass = "yduigurcsaizdxcp";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: emailTo,
};