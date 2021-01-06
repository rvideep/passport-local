const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {validatePassword} = require("../lib/passUtility");
const User = require("../model/local");

const verifyCallBack = (username, password, done) => {
    User.findOne({ username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
       
        const valid = validatePassword(password, user.salt, user.hash);
    
        if (!valid) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
}

const localStartegy = new LocalStrategy(verifyCallBack);

passport.use(localStartegy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
  });
});