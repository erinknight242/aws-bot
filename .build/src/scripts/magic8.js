"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
const utils_1 = require("../utils/utils");
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
exports.regex = /(will (.+)\?)/gi;
exports.default = (app) => {
    app.event('app_mention', async ({ event, say }) => {
        if (event.text.match(exports.regex)) {
            await say(`:magic8ball: ${answers[(0, utils_1.random)(answers.length)]}`);
        }
    });
};
//# sourceMappingURL=magic8.js.map