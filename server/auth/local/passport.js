var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'userid',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(userid, password, done) {
      User.findOne({
        email: userid
      }, function(err, user) {
        
        // エラー発生
        // → エラーを返す
        if (err) {
          console.log(err);
          return done(err);
        }

        // ユーザ未登録
        // → エラーを返す
        if (!user) {
          console.log('user not defined');
          return done(null, false, { message: 'ユーザIDもしくはパスワードが違います' });
        }

        // ユーザ登録済みだがパスワードが不正
        // → エラーを返す
        if (!user.authenticate(password)) {
          console.log('invalid password');
          return done(null, false, { message: 'ユーザIDもしくはパスワードが違います' });
        }


        console.log('ok');
        // 正常の場合はuser情報を返す
        return done(null, user);
      });
    }
  ));
};
