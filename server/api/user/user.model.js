'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['local', 'facebook', 'google', 'twitter'];
var Promise = require('bluebird');
var AttendSchema = require('../event/attend.model');

var UserSchema = new Schema({
  /**
   * ユーザ名
   */
  username: String,
  /**
   * メールアドレス
   */
  email: String,
  hashedPassword: String,
  /** 認証方式 */
  provider: String,
  /** イベント情報 */
  events:[{type: Schema.ObjectId, ref: 'Attend'}],
  salt: String
});

UserSchema.index(
  {
    email: 1,
    provider: 1
  },
  {
    unique: true
  }
);

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.username
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id
    };
  });

/**
 * Validations
 */

// Validate empty username
UserSchema
  .path('username')
  .validate(function(username) {
    return username.length;
  }, 'usernameを入力してください');

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'emailを入力してください');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (this.provider === 'local') {
      return hashedPassword.length;
    }
    else {
      return true;
    }
  }, 'パスワードを入力してください');


var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (this.provider === 'local' && !validatePresenceOf(this.hashedPassword)) {
      next(new Error('Invalid password'));
    }
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    if (this.provider === 'local') {
      return this.encryptPassword(plainText) === this.hashedPassword;
    }
    else {
      return false;
    }
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);


