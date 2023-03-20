import { random, timeOfDay } from "../utils/utils";
import { MessageProps, SayProps } from "../utils/types";

export const helloRegex = /hello/i;
export const whoRegex = /who are you?/i;

export default (app: any) => {
  app.message(helloRegex, async ({ message, say }: MessageProps) => {
    const greetings = [
      `Hey there <@${message.user}>!`,
      `Good ${timeOfDay()}, <@${message.user}>!`,
      "Howdy!",
    ];

    await say(greetings[random(greetings.length)]);
  });

  app.message(whoRegex, async ({ say }: SayProps) => {
    const botType =
      process.env.NODE_ENV !== "development" ? "AWS bot" : "local bot";
    await say(botType);
  });
};
