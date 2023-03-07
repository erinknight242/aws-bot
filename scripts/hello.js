module.exports = (app) => {
  app.message(/hello/i, async ({ message, say }) => {
    await say(`Hey there <@${message.user}>!`);
  });

  app.message('can I get a button?', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Text? Button?`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        }
      ],
      text: `Sho 'nuff`
    });
  });


  app.action('button_click', async ({ body, ack, say }) => {
    await ack();
    await say(`<@${body.user.id}> This is the local bot!`);
  });

  app.message('who are you?', async ({ message, say }) => {
    await say(`AWS bot`);
  });
}
