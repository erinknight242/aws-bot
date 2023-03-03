const express = require('express');
const app = express()
app.get('/',(req,res)=>res.json({message: 'Hello World'}))
app.listen(process.env.PORT || 3000)

// const { App } = require('@slack/bolt');

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: false,
//   appToken: process.env.SLACK_APP_TOKEN
// });

// (async () => {
//   await app.start(process.env.PORT || 3000);

//   console.log('⚡️ Bolt app is running!');
// })();

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
