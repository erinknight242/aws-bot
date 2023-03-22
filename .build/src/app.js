"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const cycleInfo_1 = __importDefault(require("./scripts/cycleInfo"));
const hello_1 = __importDefault(require("./scripts/hello"));
const magic8_1 = __importDefault(require("./scripts/magic8"));
const whereIs_1 = __importDefault(require("./scripts/whereIs"));
let app;
let token = '';
let signingSecret = '';
token = process.env.SLACK_BOT_TOKEN || '';
signingSecret = process.env.SLACK_SIGNING_SECRET || '';
const awsLambdaReceiver = new bolt_1.AwsLambdaReceiver({
    signingSecret,
});
const startApp = () => {
    app = new bolt_1.App({
        token,
        receiver: awsLambdaReceiver,
    });
    (async () => {
        await app.start(process.env.PORT || 3000);
        console.log('⚡️ Bolt app is running!');
        (0, cycleInfo_1.default)(app);
        (0, hello_1.default)(app);
        (0, magic8_1.default)(app);
        (0, whereIs_1.default)(app);
    })();
};
startApp();
module.exports.handler = async (event, context, callback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
};
//# sourceMappingURL=app.js.map