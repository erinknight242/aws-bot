const { App } = require('@slack/bolt');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');
const helloWorld = require('./scripts/helloworld');

const secret_name = "AWS-bot";
const client = new SecretsManagerClient({
  region: "us-east-2",
});

let response;
let secret;
let app;

(async () => {
  console.log("***** - 1. Try get secrets");
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

function startApp() {
  console.log("***** - 2. Start app");
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

  const express = require('express');
  const web = express();
  const port = 3000

  web.get('/', (req, res) => res.send('Hello World!'));

  web.listen(port, () => console.log(`Example app listening on port ${port}!`));

  app = new App({
    token,
    signingSecret,
    socketMode,
    appToken
  });

  (async () => {
    console.log("***** - 3. Start app process");
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');

    helloWorld(app);
  })();
};
