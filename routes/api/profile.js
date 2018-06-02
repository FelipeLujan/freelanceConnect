/*this file holds personal info, location, bio, pretty muchh everything from the rofile model*/
/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passPort = require("passport");

//load Profile Model
const Profile = require("../../models/Profile");
//load User Model
const User = require("../../models/User");
//load validation for profile input
const validateProfileInput = require("../../validation/profile");

/*=======================================ROUTES==============================*/

//@route    GET api/profile/tests
//@desc     test post route
//@access   public
router.get("/test", (req, res) =>
  res.json({
    msg: "profile works"
  })
);
// because i used app.use("/api/users", users), router.get("/tests") renders localhost:xxx/api/users/tests

//@route    GET api/profile/
//@desc     get current user's profile (when the person registers he doesn't have the prfile, just the user)
//@access   private
router.get(
  "/",
  passPort.authenticate("jwt", { session: false }, (req, res) =>
    Profile.findOne({ user: req.user.id })
      //inside the Profile, the key is going to be filled with the result of req.user.id
      .then(profile => {
        //findOne promise is going to return a profile given the user id
        const errors = {};
        if (!profile) {
          //if no user is found, create and errors object an populate it
          errors.noProfile = "there is no profile for this user";
          return res.status(404).json();
        }
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
      })
  )
);

//@route    POST api/profile/
//@desc     create or edit user profile
//@access   private
router.post(
  "/",
  passPort.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate profile creation/update inputs
    const { errors, isValid } = validateProfileInput(req.body);

    //check isValid, if not valid, return errors' contents
    if (!isValid) {
      res.status(400).json(errors);
    }

    // get fields form req.body and fill profileFields with it's content
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;

    //split into array because the social networks come as CSV,
    // the array objects are going to be created every time a (,) is found
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }

    //because social is an object of social networks
    profileFields.social = {};

    //if a social network is found, put it's content inside the social object
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.body.id }).then(profile => {
      if (profile) {
        // search for an user given the logged in user's id
        //if a profile with this id is found, that means that the user us updating, not creating
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      }
      //if the profile is not found, it means that the user just registered and doesn't have a profile yet
      //check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          /*errors.handle = "this handle already exists";
          res.status(400).json(errors);*/
        }

        //save profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    });
  }
);
module.exports = router;
