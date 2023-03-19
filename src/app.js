import { App } from "@slack/bolt";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import cycleInfo from "./scripts/cycleInfo";
import hello from "./scripts/hello";
import magic8 from "./scripts/magic8";
import whereIs from "./scripts/whereIs";

let response;
let secret;
let app;

if (process.env.NODE_ENV !== "development") {
  const secret_name = "aws-bot-secret";
  const client = new SecretsManagerClient({
    region: "us-east-2",
  });
  (async () => {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );

    console.log("here 4");
    secret = JSON.parse(response.SecretString);
    startApp();
  })();
} else {
  startApp();
}

function startApp() {
  let token = "";
  let signingSecret = "";
  let socketMode = "";
  let appToken = "";

  if (process.env.NODE_ENV === "development") {
    console.log("development");
    token = process.env.SLACK_BOT_TOKEN;
    signingSecret = process.env.SLACK_SIGNING_SECRET;
    socketMode = true;
    appToken = process.env.SLACK_APP_TOKEN;
  } else {
    console.log("not development");
    token = secret.SLACK_BOT_TOKEN;
    signingSecret = secret.SLACK_SIGNING_SECRET;
    socketMode = false;
  }
  console.log(token, signingSecret, socketMode);

  app = new App({
    token,
    signingSecret,
    socketMode,
    appToken,
  });

  (async () => {
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ Bolt app is running!");

    cycleInfo(app);
    hello(app);
    magic8(app);
    whereIs(app);
  })();
}
