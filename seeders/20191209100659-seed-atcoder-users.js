"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "atcoder_users",
      [
        {
          slack_id: "UKAM03K4l",
          slack_username: "Yeoh Soon Keat",
          atcoder_username: "yeohsoonkeat",
          vc_name: "c4k",
          batch: "6",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("atcoder_user", null, {});
  }
};
