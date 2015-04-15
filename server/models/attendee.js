'use strict';

module.exports = function (sequelize, DataTypes) {
  var Attendee = sequelize.define('Attendee', {
    /** 参加者ID */
    attendeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /** イベント名 */
    eventId: DataTypes.INTEGER,
    /** ユーザID */
    userId: DataTypes.INTEGER,
    /** ユーザ名 */
    userName: DataTypes.STRING,
    /** コメント */
    comment: DataTypes.STRING,
    /** 登録日時 */
    createDate: DataTypes.STRING,
    /** キャンセルフラグ */
    cancelFlag: DataTypes.BOOLEAN,
    /** キャンセル日時 */
    cancelDate: DataTypes.STRING
  });

  return Attendee;
};
