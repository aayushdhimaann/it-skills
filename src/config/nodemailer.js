import nodemailer from "nodemailer";

const user = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export const mailOption = {
  from: user,
  to: user,
};
