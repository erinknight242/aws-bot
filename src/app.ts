import { App } from '@slack/bolt';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
} from '@aws-sdk/client-secrets-manager';
import cycleInfo from './scripts/cycleInfo';
import hello from './scripts/hello';
import magic8 from './scripts/magic8';
import whereIs from './scripts/whereIs';

export type SecretFormat = {
  SLACK_SIGNING_SECRET?: string;
  SLACK_BOT_TOKEN?: string;
};

let response: GetSecretValueCommandOutput;
let secret: SecretFormat;
let app;

const startApp = () => {
  let token = '';
  let signingSecret = '';
  let socketMode = false;
  let appToken = '';

  if (process.env.NODE_ENV === 'development') {
    token = process.env.SLACK_BOT_TOKEN || '';
    signingSecret = process.env.SLACK_SIGNING_SECRET || '';
    socketMode = true;
    appToken = process.env.SLACK_APP_TOKEN || '';
  } else {
    token = secret.SLACK_BOT_TOKEN || '';
    signingSecret = secret.SLACK_SIGNING_SECRET || '';
  }

  app = new App({
    token,
    signingSecret,
    socketMode,
    appToken,
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

if (process.env.NODE_ENV !== 'development') {
  // get configs from AWS secret manager
  const secret_name = 'aws-bot-secret';
  const client = new SecretsManagerClient({
    region: 'us-east-2',
  });
  (async () => {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT',
      })
    );
    if (response.SecretString) {
      secret = JSON.parse(response.SecretString);
    }
    startApp();
  })();
} else {
  // use local env vars
  startApp();
}
