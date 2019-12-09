'use strict';
module.exports = (sequelize, DataTypes) => {
  const atcoder_user = sequelize.define('atcoder_user', {
    slack_id: DataTypes.STRING,
    slack_username: DataTypes.STRING,
    atcoder_username: DataTypes.STRING,
    vc_name: DataTypes.STRING,
    batch: DataTypes.STRING
  }, {});
  atcoder_user.associate = function(models) {
    // associations can be defined here
  };
  return atcoder_user;
};