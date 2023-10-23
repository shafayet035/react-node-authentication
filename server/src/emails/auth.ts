import { AWS_EMAIL_FROM } from '../constants';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SendEmail } from '.';

export const sendPasswordResetEmail = async (
  email: string,
  passwordResetCode: string,
) => {
  if (!AWS_EMAIL_FROM) return;

  const params = {
    Source: AWS_EMAIL_FROM,
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
  };

  const command = new SendEmailCommand(params);

  try {
    const response = await SendEmail.send(command);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
