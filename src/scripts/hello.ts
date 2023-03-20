import { random, timeOfDay } from "../utils/utils";

export type Message = {
  user?: string;
};

export type MessageProps = {
  message: Message;
  say?: any;
};

export type SayProps = {
  say: any;
};

export default (app: any) => {
  app.message(/hello/i, async ({ message, say }: MessageProps) => {
    const greetings = [
      `Hey there <@${message.user}>!`,
      `Good ${timeOfDay()}, <@${message.user}>!`,
      "Howdy!",
    ];

    await say(greetings[random(greetings.length)]);
  });

  app.message("who are you?", async ({ say }: SayProps) => {
    const botType =
      process.env.NODE_ENV !== "development" ? "AWS bot" : "local bot";
    await say(botType);
  });
};
