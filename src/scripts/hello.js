import { random, timeOfDay } from "../utils/utils";

export default (app) => {
  app.message(/hello/i, async ({ message, say }) => {
    const greetings = [
      `Hey there <@${message.user}>!`,
      `Good ${timeOfDay()}, <@${message.user}>!`,
      "Howdy!",
    ];

    await say(greetings[random(greetings.length)]);
  });

  app.message("who are you?", async ({ say }) => {
    const botType =
      process.env.NODE_ENV !== "development" ? "AWS bot" : "local bot";
    await say(botType);
  });
};
