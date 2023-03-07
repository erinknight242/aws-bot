const { App } = require('@slack/bolt');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');
const cycleInfo = require('./scripts/cycleInfo');
const helloWorld = require('./scripts/helloWorld');

let response;
let secret;
let app;

if (process.env.NODE_ENV !== 'development') {
  const secret_name = "AWS-bot";
  const client = new SecretsManagerClient({
    region: "us-east-2",
  });
  (async () => {
    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      );
    } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      throw error;
    }
    secret = JSON.parse(response.SecretString);
    console.log(secret);
    startApp();
  })();
} else {
  startApp();
}

function startApp() {
  let token = '';
  let signingSecret = '';
  let socketMode = '';
  let appToken = '';

  if (process.env.NODE_ENV === 'development') {
    token = process.env.SLACK_BOT_TOKEN;
    signingSecret = process.env.SLACK_SIGNING_SECRET;
    socketMode = true;
    appToken = process.env.SLACK_APP_TOKEN;
  } else {
    token = secret.SLACK_BOT_TOKEN;
    signingSecret = secret.SLACK_SIGNING_SECRET;
    socketMode = false;
  }
  console.log(token, signingSecret, socketMode);

  app = new App({
    token,
    signingSecret,
    socketMode,
    appToken
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');

    cycleInfo(app);
    helloWorld(app);
  })();
};
