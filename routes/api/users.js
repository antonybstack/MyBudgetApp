const express = require("express");
const userRoutes = express.Router();
const passport = require("passport");
const passportConfig = require("../../passport");
const passportJWT = require("passport-jwt");
const JWT = require("jsonwebtoken");

// User model
const User = require("../../models/user.model");

const signToken = (userID) => {
  //JWT paylod
  return JWT.sign(
    {
      iss: "MyBudgetApp",
      sub: userID, //subject
    },
    "MyBudgetApp",
    { expiresIn: "1h" }
  );
};

//REGISTER
userRoutes.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  //check if username exists first
  User.findOne({ username }, (err, user) => {
    //error searching username
    if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    //username already taken
    if (user) res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
    //if username doesnt exist yet
    else {
      const newUser = new User({ username, password, role });
      //username length check
      if (username.length < 4 || username.length > 20) {
        res.status(400).json({ message: { msgBody: "Username must be between 4 and 20 characters long", msgError: true } });
        //password length check
      } else if (password.length < 4 || password.length > 20) {
        res.status(400).json({ message: { msgBody: "Password must be between 4 and 20 characters long", msgError: true } });
      } else {
        newUser.save((err) => {
          //if mongoose schema creation error
          if (err) res.status(500).json({ message: { msgBody: err, msgError: true } });
          else res.status(201).json({ message: { msgBody: "Account successfully created.", msgError: false } });
        });
      }
    }
  });
});

// LOGIN
// local coming from LocalStrategy in passport.js
userRoutes.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  //isAuthenticated aka req.session.passport.user !== undefined
  if (req.isAuthenticated()) {
    //req.user is coming from: password.use in passport.js uses comparepassword function, that function is in user.model.js which returns user object if password matches ('this')
    const { _id, username, role, avatar, monthly_budget_total } = req.user;
    //creates JWT token
    const token = signToken(_id);
    //set cookie as access token. httpOnly protects from Cross-site scripting attacks, cannot steal cookie using javascript. sameSite protects from Cross-site forgery attacks
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { _id, username, role, avatar, monthly_budget_total }, message: { msgBody: "Account successfully logged in", msgError: false } });
  }
});

//LOGOUT
userRoutes.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");

  res.json({ user: { username: "", role: "" }, success: true });
});

//CHECK IF ADMIN
userRoutes.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ message: { msgBody: "You are an admin", msgError: false } });
  } else res.status(403).json({ message: { msgBody: "You're not an admin, go away", msgError: true } });
});

//CHECK IF AUTHENTICATED
userRoutes.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { _id, username, role, avatar, monthly_budget_total } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { _id, username, role, avatar, monthly_budget_total } });
});

// get current user object
userRoutes.get("/getuser", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});

userRoutes.route("/update/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      console.log(req.body);
      user.monthly_budget_total = req.body.monthly_budget_total;
    }

    user
      .save()
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.status(400).json({ message: { msgBody: "error updating user", msgError: true } });
      });
  });
});

// get specific user by id
userRoutes.get("/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

//get all users, should delete later
userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
    } else {
      res.json(users);
    }
  });
});

module.exports = userRoutes;
