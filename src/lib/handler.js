const short = require("short-uuid");
const {
  nedbInsert,
  nedbFindOne,
  getTokenFromAffiliation
} = require("./promise");

/**
 *
 * @param {event of message} event
 */
const connectHandler = async (event, rtm) => {
  var translator = short();
  let slack_id = event.user;
  let slack_message = event.text;
  let slack_channel = event.channel;
  let atcoder_username = slack_message.split(" ")[2];
  let token = translator.generate();

  rtm.sendMessage(
    `Your token is ${token}, Please include it in your profile's affiliation.`,
    slack_channel,
    err => {
      if (err) {
        console.error(err);
      }
    }
  );

  let document = {
    slack_id: slack_id,
    atcoder_username: atcoder_username,
    token: token,
    createdAt: new Date().getTime()
  };

  nedbInsert(document).catch(err => {
    if (err) {
      console.error(err);
    }
  });
};

/**
 *
 * @param {event of message} event
 */
const confirmHandler = async (event, rtm) => {
  let slack_id = event.user;
  let slack_channel = event.channel;

  const confirming_user = await nedbFindOne({ slack_id: slack_id }).catch(
    err => {
      console.error(err);
    }
  );

  if (!confirming_user) {
    return;
  }

  const token = await getTokenFromAffiliation(confirming_user.atcoder_username);

  if (token == confirming_user.token) {
    rtm.sendMessage(
      `atCoder account connected successfully!!!`,
      slack_channel,
      err => {
        if (err) {
          console.error(err);
        }
      }
    );
  } else {
    rtm.sendMessage(
      `Sorry, we cannot confirm your atCoder account (${confirming_user.atcoder_username}). Please make sure you connected the right username.`,
      slack_channel,
      err => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
};

module.exports = {
  connectHandler: connectHandler,
  confirmHandler: confirmHandler
};
