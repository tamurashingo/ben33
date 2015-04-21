'use strict';

module.exports = function (sequelize, DataTypes) {
  var History = sequelize.define('History', {
    /** hisotry id*/
    historyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /** イベントID */
    eventId: DataTypes.INTEGER,
    /** 内容 */
    description: DataTypes.TEXT,
    /** 作成日時 */
    createDate: DataTypes.STRING
  });

  return History;
};
