# aws-bot

Slack chat bot running on Node, built using the Slack Bolt javascript framework

## Development

To run the bot locally, first clone the repo, then set the following environment variables:
- SLACK_BOT_TOKEN - this is found in the Slack API under OAuth & Permissions
- SLACK_SIGNING_SECRET - this is found in the Slack API under Signing Secret
- SLACK_APP_TOKEN - this is found in the Slack API under App-Level Tokens

#### Setting local env vars on Mac

On the terminal from the app's root directory once you have found the appropriate values, run:
`export SLACK_BOT_TOKEN=xoxb-tokenvalue`

`export SLACK_SIGNING_SECRET=signingsecretvalue`

`export SLACK_APP_TOKEN=xapp-tokenvalue`

#### Local Development

It's recommended that you use [VS Code](https://code.visualstudio.com/) during local development.This will let you use [Prettier](https://prettier.io/) to keep formatting and syntax consistent when you save a file.

You can take advantage of a local development server (with hot reloading) to avoid restarting the app for every change:

```sh
# Don't use npm! Only use yarn: https://yarnpkg.com/en/
yarn install
yarn run dev
```

#### Adding a new script
To add a new script/function to the bot, create a new script in the `src/scripts` folder. Then, in `src/app.ts` (at the bottom of the file), add a call to your new function to pass the app object into it.

#### Tests

Tests rely on [Jest](https://jestjs.io/). Tests can be run with the following:

```sh
# Run all tests
yarn test

# Run tests for a file or directory (looks for partial Regex matches)
yarn test file-or-directory-name
```