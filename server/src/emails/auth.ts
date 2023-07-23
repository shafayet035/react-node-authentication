import nodemailer from 'nodemailer';
import { SMTP_EMAIL_FROM, SMTP_PASSWORD, SMTP_USER_NAME } from '../constants';

const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: SMTP_USER_NAME,
    pass: SMTP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, passwordResetCode: string) => {
  try {
    const info = await transporter.sendMail({
      from: SMTP_EMAIL_FROM,
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is ${passwordResetCode}`,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
