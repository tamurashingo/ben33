'use strict';

module.exports = function (sequelize, DataTypes) {
  var Mgr = sequelize.define('Mgr', {
    /** イベント管理者ID */
    mgrId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /** イベントID */
    eventId: DataTypes.INTEGER,
    /** ユーザID */
    userId: DataTypes.INTEGER,
    /** ユーザ名 */
    userName: DataTypes.STRING,
    /** 役割 */
    roleName: DataTypes.STRING
  });

  return Mgr;
};
