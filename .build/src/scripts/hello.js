"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoRegex = exports.helloRegex = void 0;
const utils_1 = require("../utils/utils");
exports.helloRegex = /hello/i;
exports.whoRegex = /who are you?/i;
exports.default = (app) => {
    app.message(exports.helloRegex, async ({ message, say }) => {
        const greetings = [
            `Hey there <@${message.user}>!`,
            `Good ${(0, utils_1.timeOfDay)()}, <@${message.user}>!`,
            'Howdy!',
        ];
        await say(greetings[(0, utils_1.random)(greetings.length)]);
    });
    app.message(exports.whoRegex, async ({ say }) => {
        const botType = process.env.NODE_ENV !== 'development' ? 'AWS bot' : 'local bot';
        await say(botType);
    });
};
//# sourceMappingURL=hello.js.map