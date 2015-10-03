'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');

var user = null;

var user2 = new User({
  provider: 'facebook',
  username: 'Fake User',
  email: 'test@test.com'
});

describe('User Model', function() {
  beforeEach(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
    
    user = new User({
      provider: 'local',
      username: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });
  });

  it('Userテーブルが0件であること', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('emailとproviderが重複したユーザの登録がエラーとなること', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        console.log(err);
        should.exist(err);
        done();
      });
    });
  });

  it('emailが空の場合、ユーザ登録に失敗すること', function(done) {
    user.email = '';
    user.save(function(err) {
      console.log(err);
      should.exist(err);
      done();
    });
  });
  
  it('usernameが空の場合、ユーザ登録に失敗すること', function(done) {
    user.username = '';
    user.email = 'test@test.com';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('providerがlocalでpasswordが空の場合、ユーザ登録に失敗すること', function(done) {
    user.password = '';
    user.save(function(err) {
      console.log(err);
      should.exist(err);
      done();
    });
  });

  it('providerがlocal以外でpasswordが空の場合、ユーザ登録に成功すること', function(done) {
    user2.password = '';
    user2.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it("パスワードがあっている場合、認証OKとなること", function(done) {
    user.save(function(err) {
      user.authenticate('password').should.be.true;
      done();
    });
  });

  it("パスワードが違っている場合、認証NGとなること", function(done) {
    user.save(function(err) {
      user.authenticate('blah').should.not.be.true;
      done();
    });
  });

  it('providerがlocal以外の場合、パスワード認証がNGを返すこと', function(done) {
    user2.save(function(err) {
      user2.authenticate('password').should.not.be.true;
      done();
    });
  });
});
