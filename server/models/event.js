'use strict';

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    /** イベントID */
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /** イベント名 */
    title: DataTypes.STRING,
    /** 開始日時 */
    startDate: DataTypes.STRING,
    /** 終了日次 */
    endDate: DataTypes.STRING,
    /** イベント管理者へのID */
    mgrId: DataTypes.INTEGER,
    /** 開催場所 */
    venue: DataTypes.STRING,
    /** 参加者へのID */
    attendeeId: DataTypes.INTEGER,
    /** イベント概要 */
    abstraction: DataTypes.STRING,
    /** イベント詳細 */
    comment: DataTypes.TEXT,
    /** 添付へのID */
    attachId: DataTypes.INTEGER,
    /** イベント情報作成者 */
    createdBy: DataTypes.INTEGER,
    /** イベント情報作成日時 */
    createDate: DataTypes.DATE,
    /** イベント情報更新日時 */
    updateDate: DataTypes.DATE
  });

  return Event;
};
