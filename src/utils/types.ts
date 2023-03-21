export type App = {
  command: (
    arg0: string,
    arg1: ({ command, ack, say }: { command: any; ack: any; say: any }) => Promise<void>
  ) => void;
  message: (
    arg0: RegExp,
    arg1: ({ say, message }: { say: any; message: any }) => Promise<void>
  ) => void;
  event: (arg0: string, arg1: ({ event, say }: { event: any; say: any }) => Promise<void>) => void;
};

/* 
export const messageWithMention = {
  client_msg_id: "b0ded4fe-80e0-4df3-8f55-7aa7bb9530e7",
  type: "message",
  text: "<@U04SETPNCQ6> hello",
  user: "U04S6UJN7U7",
  ts: "1679322925.152549",
  blocks: [
    {
      type: "rich_text",
      block_id: "4m/A",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            { type: "user", user_id: "U04SETPNCQ6" },
            { type: "text", text: " hello" },
          ],
        },
      ],
    },
  ],
  team: "T04SJGNAVPX",
  channel: "D04TB6QB9K2",
  event_ts: "1679322925.152549",
  channel_type: "im",
};
*/

export type Message = {
  user?: string;
  client_msg_id: string;
  type: string;
  text: string;
  ts: string;
  blocks: Array<Block>;
  team: string;
  channel: string;
  event_ts: string;
  channel_type: string;
};

export type Block = {
  type: string;
  block_id: string;
  elements: Array<Section>;
};

export type Section = {
  type: string;
  elements: Array<Element>;
};

export type Element = {
  type: string;
  user_id?: string;
  text?: string;
};

export type MessageProps = {
  message: Message;
  say?: any;
};

export type SayProps = {
  say: any;
};
