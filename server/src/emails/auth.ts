import aws from 'aws-sdk';
import { AWS_EMAIL_FROM } from '../constants';

const SES = new aws.SES({
  region: 'us-east-1',
});

export const sendPasswordResetEmail = async (email: string, passwordResetCode: string) => {
  if (!AWS_EMAIL_FROM) return;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your password reset code is ${passwordResetCode}`,
        },
      },
      Subject: {
        Data: 'Password Reset Code',
      },
    },
    Source: AWS_EMAIL_FROM,
  };
  SES.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Sent Succesfully \n', data);
    }
  });
};
