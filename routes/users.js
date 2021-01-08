const router = require("express").Router();
const {genPassword} = require("../lib/passUtility");
const User = require("../model/local"); 
const passport = require("passport");
require("../config/passport")(passport);

router.get("/", (req, res) => res.render("home"));

router.route("/register")
.get((req, res) => {
  res.render("register");
})
.post((req, res) => {
  const {username, password} = req.body;
  const {salt, hash} = genPassword(password);
  User.findOne({username}, (err, userFound) => {
    if(err)
      console.log(err);
    else {
      if(!userFound) {
        const user = new User({
          username,
          salt,
          hash
        });

        user.save().then(() => res.redirect("/login"));
      } else {
        res.send("user already exist");
      }
    }
  });
});

router.route("/login")
.get((req, res) => {
  res.render("login");
})
.post(passport.authenticate('local', { 
  successRedirect: '/dashboard', 
  failureRedirect: '/login'}
));

router.get("/dashboard", (req, res) => {
    if(req.isAuthenticated())
        res.render("dashboard");
    else
        res.redirect("/login");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;