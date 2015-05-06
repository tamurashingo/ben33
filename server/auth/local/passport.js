var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'userid',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(userid, password, done) {
      console.log('first strategy');
      User.findOne({
        userId: userid
      }, function(err, user) {
        
        // エラー発生
        // → エラーを返す
        if (err) {
          return done(err);
        }

        // ユーザ未登録
        // → 次の認証方式を試す
        if (!user) {
          return done(null, user);
        }

        // ユーザ登録済みだがパスワードが不正
        // → エラーを返す
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'ユーザIDもしくはパスワードが違います' });
        }

        // 正常の場合はuser情報を返す
        return done(null, user);
      });
    }
  ));
};
