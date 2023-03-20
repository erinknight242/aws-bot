export type App = {
  command: (
    arg0: string,
    arg1: ({
      command,
      ack,
      say,
    }: {
      command: any;
      ack: any;
      say: any;
    }) => Promise<void>
  ) => void;
  message: (
    arg0: RegExp,
    arg1: ({ say }: { say: any }) => Promise<void>
  ) => void;
  event: (
    arg0: string,
    arg1: ({ event, say }: { event: any; say: any }) => Promise<void>
  ) => void;
};
