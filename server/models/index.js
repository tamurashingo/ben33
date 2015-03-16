'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var db = {};


var _attendee = require('./attendee');
var _event = require('./event');
var _history = require('./history');
var _mgr = require('./mgr');
var _user = require('./user');


module.exports = {

  init: function (config) {
    var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);

    var Attendee = _attendee(sequelize, Sequelize);
    var Event = _event(sequelize, Sequelize);
    var History = _history(sequelize, Sequelize);
    var Mgr = _mgr(sequelize, Sequelize);
    var User = _user(sequelize, Sequelize);

    db.Attendee = Attendee;
    db.Event = Event;
    db.History = History;
    db.Mgr = Mgr;
    db.User = User;

    Event.hasMany(Attendee, {foreignKey: 'eventId'});
    Event.hasMany(Mgr, {foreignKey: 'eventId'});

    Attendee.belongsTo(Event, {foreignKey: 'eventId'});
    Mgr.belongsTo(Event, {foreignKey: 'eventId'});


//    fs.readdirSync(__dirname)
//      .filter(function (file) {
//        return (file.indexOf('.') !== 0) && (file !== 'index.js');
//      })
//      .forEach(function (file) {
//        var model = sequelize['import'](path.join(__dirname, file));
//        db[model.name] = model;
//      });
//
//    Object.keys(db).forEach(function (modelName) {
//      console.log(modelName);
//      if ('associate' in db[modelName]) {
//console.log('associate');
//        db[modelName].associate(db);
//      }
//    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
  },

  models: function () {
    return db;
  }
};


