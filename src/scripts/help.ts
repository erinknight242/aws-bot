import { MessageProps, SayProps } from '../utils/types';

export default (app: any) => {
  app.message(/help/i, async ({ message, say }: MessageProps) => {
    if (message.channel_type === 'im') {
      await say(`Hi there, <@${message.user}>! What can I do for you?`);
    }
  });
};
