import { App } from '../utils/types';
import { random } from '../utils/utils';

const answers = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  'Do not count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful',
];

export const regex = /(will (.+)\?)/gi;

export default (app: App) => {
  app.event('app_mention', async ({ event, say }) => {
    if (event.text.match(regex)) {
      await say(`:magic8ball: ${answers[random(answers.length)]}`);
    }
  });
};
