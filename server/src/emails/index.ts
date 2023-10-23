import { SESClient } from '@aws-sdk/client-ses';

export const SendEmail = new SESClient({
  region: 'us-east-1',
});
