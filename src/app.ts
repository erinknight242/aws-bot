import { App, AwsLambdaReceiver } from '@slack/bolt';
// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
//   GetSecretValueCommandOutput,
// } from '@aws-sdk/client-secrets-manager';
import cycleInfo from './scripts/cycleInfo';
import hello from './scripts/hello';
import magic8 from './scripts/magic8';
import whereIs from './scripts/whereIs';

export type SecretFormat = {
  SLACK_SIGNING_SECRET?: string;
  SLACK_BOT_TOKEN?: string;
};

//let response: GetSecretValueCommandOutput;
//let secret: SecretFormat;
let app;
let token = '';
let signingSecret = '';

//if (process.env.NODE_ENV === 'development') {
token = process.env.SLACK_BOT_TOKEN || '';
signingSecret = process.env.SLACK_SIGNING_SECRET || '';
// } else {
//   token = secret.SLACK_BOT_TOKEN || '';
//   signingSecret = secret.SLACK_SIGNING_SECRET || '';
// }

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret,
});

const startApp = () => {
  app = new App({
    token,
    receiver: awsLambdaReceiver,
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');

    cycleInfo(app);
    hello(app);
    magic8(app);
    whereIs(app);
  })();
};

startApp();

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
