const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");
require("dotenv").config();

const app = express();

const Port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

require("./config/database");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(Port);