const router = require("express").Router();
const {genPassword} = require("../lib/passUtility");
const User = require("../model/local"); 
const passport = require("passport");
require("../config/passport");

router.get("/register", (req, res) => {
    res.render("register");
  });
  
router.get("/login", (req, res) => {
      res.render("login");
  });

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
  
router.post("/register", (req, res) => {
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
  
router.post("/login", passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login'}));

module.exports = router;