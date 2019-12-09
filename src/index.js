require("dotenv").config();
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const { RTMClient } = require("@slack/rtm-api");
const { connectHandler, confirmHandler } = require("./lib/handler");
const rtm = new RTMClient(SLACK_TOKEN);

rtm.on("message", event => {
  if (event.text.match(/^!atcoder connect \w{2,20}$/g)) {
    connectHandler(event, rtm);
  } else if (event.text.match(/^!atcoder confirm$/g)) {
    confirmHandler(event, rtm);
  }
});

(async () => {
  await rtm.start();
})();

//https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create
// const db = require("../models");
// db.atcoder_users
//   .findAll()
//   .then(atcoder_users => console.log(atcoder_users))
//   .catch(err => {
//     if (err) {
//       console.log(err);
//     }
//   });
