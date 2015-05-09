'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');

var user = new User({
  provider: 'local',
  userId: 'testuser',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('User Model', function() {
  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('Userテーブルが0件であること', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('userIdが重複したユーザの登録がエラーとなること', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('userIdが空の場合、ユーザ登録に失敗すること', function(done) {
    user.userId = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });
  
  it('emailが空の場合でも、ユーザ登録に成功すること', function(done) {
    user.userId = 'testuser';
    user.email = '';
    user.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it("パスワードがあっている場合、認証OKとなること", function() {
    return user.authenticate('password').should.be.true;
  });

  it("パスワードが違っている場合、認証NGとなること", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});
