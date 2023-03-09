const { random, timeOfDay } = require('../utils/utils');

module.exports = (app) => {
  app.message(/hello/i, async ({ message, say }) => {
    const greetings = [
      `Hey there <@${message.user}>!`,
      `Good ${timeOfDay()}, <@${message.user}>!`,
      "Howdy!"
    ];

    await say(greetings[random(greetings.length)]);
  });

  app.message('who are you?', async ({ message, say }) => {
    const botType = process.env.NODE_ENV !== 'development' ? 'AWS bot' : 'local bot'
    await say(botType);
  });
}
