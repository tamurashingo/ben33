'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    /** ユーザ情報 */
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /** ユーザ名 */
    userName: DataTypes.STRING,
    /** 有効フラグ */
    valid: DataTypes.BOOLEAN
  });

  return User;
};
