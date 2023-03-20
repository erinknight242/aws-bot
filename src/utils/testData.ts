import { Message } from "./types";

export const messageWithMention: Message = {
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
