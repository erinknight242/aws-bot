const { App } = require('@slack/bolt');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');

const secret_name = "AWS-bot";
const client = new SecretsManagerClient({
  region: "us-east-2",
});

let response;
let secret;

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
  secret = response.SecretString;
  startApp();
})();

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

  const express = require('express');
  const web = express();
  const port = 3000

  web.get('/', (req, res) => res.send('Hello World!'));

  web.listen(port, () => console.log(`Example app listening on port ${port}!`));

  const app = new App({
    token,
    signingSecret,
    socketMode,
    appToken
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();
};

// app.message('hello', async ({ message, say }) => {
//   await say(`Hey there <@${message.user}>!`);
// });

// app.message('can I get a button?', async ({ message, say }) => {
//   // say() sends a message to the channel where the event was triggered
//   await say({
//     blocks: [
//       {
//         "type": "section",
//         "text": {
//           "type": "mrkdwn",
//           "text": `Text? Button?`
//         },
//         "accessory": {
//           "type": "button",
//           "text": {
//             "type": "plain_text",
//             "text": "Click Me"
//           },
//           "action_id": "button_click"
//         }
//       }
//     ],
//     text: `Sho 'nuff`
//   });
// });


// app.action('button_click', async ({ body, ack, say }) => {
//   await ack();
//   await say(`<@${body.user.id}> This is the local bot!`);
// });

// app.message('who are you?', async ({ message, say }) => {
//   await say(`Azure bot`);
// });
