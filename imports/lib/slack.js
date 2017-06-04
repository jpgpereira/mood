import { Meteor } from 'meteor/meteor';
import { IncomingWebhook } from '@slack/client';

// const TOKEN = process.env.SLACK_API_TOKEN || Meteor.settings.api.slack.token;
const WEBHOOK_URL = process.env.WEBHOOK_URL || Meteor.settings.api.slack.webhook_url;

module.exports = {
  notifySlack: (message) => {
    const webhook = new IncomingWebhook(WEBHOOK_URL);
    webhook.send(message);
  },
  askMood: () => {},
};
