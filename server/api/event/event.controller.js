/**
 *
 *
 */

'use strict';

var models = require('../../models');
var logic = require('./event.logic');


exports.index = function (req, res) {
  logic.getEventIndex(req.params)
    .then(function (result) {
      res.json(result);
    });
};

exports.description = function (req, res) {
  // req.eventId
  logic.getEventDetail(req.params)
    .then(function (result) {
      res.json(result);
    });
};


exports.regist = function (req, res) {
};

exports.update = function (req, res) {
};
