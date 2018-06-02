/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validaton for Register
const validateRegisterInput = require("../../validation/register");

//load input validaton for Login
const validateLoginInput = require("../../validation/login");

//Import User Model
const User = require("../../models/User");

//@route    GET api/users/tests
//@desc     test post route
//@access   public
// because i used app.use("/api/users", users), router.get("/tests") renders localhost:xxx/api/users/tests
router.get("/test", (req, res) =>
  res.json({
    msg: "user works"
  })
);

//@route    GET api/users/register
//@desc     register usser to mlab
//@access   public
router.post("/register", (req, res) => {
  //validate the error from the user input
  //this pulls out "errors" and "isValid" from register.js
  const { errors, isValid } = validateRegisterInput(req.body);

  //the way to check if there are errors is evaluate if "isValid" is false
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  User.findOne({ email }).then(user => {
    if (user) {
      //first check out if the user email already exists
      //if an user with the enetered email has been found return this
      errors.email = "email previously registered";
      return res.status(400).json({ errors });
    } else {
      //if no user has been found with that email, return
      const avatar = gravatar.url({
        email,
        s: "200", //size
        r: "pg", //rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        //gensalt(10, callback) is used to encrypt the password, 10 is kind of the security level,
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //hash() takes the salt and encrypts the pass, the resulting hash is what gets saves to the db
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            //saves to MLAB
            .then(user => res.json(user))
            //if saved, res (show up) the user object
            .catch(err => console.log(err));
          //otherwise, console.log() the error
        });
      });
    }
  });
});

//@route    GET api/users/login
//@desc     return the  JWT json web token
//@access   public
router.post("/login", (req, res) => {
  //user sends a login form

  const { errors, isValid } = validateLoginInput(req.body);

  //the way to check if there are errors is evaluate if "isValid" is false
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //find user in the db by its email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
      //if !user user not found
    }
    //if user was found, check password.
    bcrypt.compare(password, user.password).then(isMatch => {
      //bcrypt.compare takes the raw password and the hashed pass retrieved from mlab
      //gives back a promise

      if (isMatch) {
        //if the object received (isMatch) matches
        //  sign token because user matched
        const payload = {
          id: user.id,
          name: user.avatar,
          avatar: user.avatar
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 2400 }, (err, token) =>
          res.json({
            success: true,
            token: "Bearer " + token
          })
        );
        //sign takes a payload (it contains the info to recognize the user),
        // a secret and expiration of the token
      } else {
        errors.password = "Password incorrect";
        //if it doesn't json password incorrect
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@desc     returns the user
//@access   private
router.get(
  "/current", //this is the route
  passport.authenticate("jwt", { session: false }), // this is the protection middleware
  (req, res) =>
    res.json({
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      email: req.user.email
    }) // this is the response in case the middleware allows to continue
);
module.exports = router;
