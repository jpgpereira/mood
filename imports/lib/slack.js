import { IncomingWebhook } from '@slack/client';

const TOKEN = process.env.SLACK_API_TOKEN || '';

module.exports = {
  notifySlack: () => {
    console.log(IncomingWebhook);
    console.log(TOKEN);
  },
};
