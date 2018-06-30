/*this file holds personal info, location, bio, pretty muchh everything from the rofile model*/
/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passPort = require("passport");

//Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Validation logic
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");

/*=======================================ROUTES==============================*/

// because i used app.use("/api/users", users), router.get("/tests") renders localhost:xxx/api/users/tests

//@route    GET api/profile/
//@desc     get current user's profile (when the person registers he doesn't have the prfile, just the user)
//@access   private
router.get(
  "/",
    passPort.authenticate("jwt", {session: false}),
    (req, res) => {
        const errors = {};

    Profile.findOne({ user: req.user.id })

    // we want the name and the avatar in the profile, but not the email
        .populate("user", ["name", "avatar"])
      //inside the Profile, the key is going to be filled with the result of req.user.id
      .then(profile => {
        //findOne promise is going to return a profile given the user id
        if (!profile) {
          //if no user is found, create and errors object an populate it
          errors.noProfile = "there is no profile for this user";
          return res.status(404).json();
        }
          console.log("profile found");
        res.json(profile);
      })
      .catch(err => {
          console.log("an error has occured", err);
      });
    }
);

//@route    GET api/profile/all
//@desc     list all profiles
//@access   public
router.get("/all", (req, res) => {
    const errors = {};
    //again, propulate name and avatar from the user collection.
    Profile.find()
        .populate("user", ["name", "avatar"])
        .then(profiles => {
            if (!profiles) {
                errors.profiles = "there are no profiles";
                return res.status(404).json();
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile: "There are no profiles"}));
});

//@route    GET api/profile/handle/:handle
//@desc     get user profile by tis handle
//@access   public, anybody even search engines will be able to see the profiles. we don't care about privacy at devConnect

router.get("/handle/:handle", (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})

    //include name and avatar in the response json (profile)
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noProfile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     get user profile by tis handle
//@access   public, anybody even search engines will be able to see the profiles. we don't care about privacy at devConnect

router.get("/user/:user_id", (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})

    //include name and avatar in the response json (profile)
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noProfile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({profile: "there is no profile for this user"})
        );
});

//@route    POST api/profile/
//@desc     create or edit user profile
//@access   private (requires header Authorization: "Bearer [token]"
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
      profileFields.user = req.user.id; //this is the logged in user, its in the request, not in the profile form
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

      Profile.findOne({user: req.user.id}).then(profile => {
      if (profile) {
          console.log("profile found for this user");
        // search for an user given the logged in user's id
          //if a profile with this id is found, that means that the user is updating, not creating a new profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
            .then(profile => {
                res.json(profile);
                console.log("profile found and updated");
            })
            .catch(error => console.log(error));
      } else {
          //check if handle exists
          Profile.findOne({handle: profileFields.handle}).then(profile => {
              if (profile) {
                  errors.handle = "That handle has already been chosen.";
                  res.status(400).json(errors);
              }
              console.log("New Profile saved.");
              new Profile(profileFields).save().then(profile => res.json(profile));
          });
      }
    });
  }
);

//@route    POST api/profile/experience
//@desc     add experience to profile
//@access   private (requires user to be logged in)
router.post(
    "/experience",
    passPort.authenticate("jwt", {session: false}),
    (req, res) => {
        const {errors, isValid} = validateExperienceInput(req.body);
        //check isValid, if not valid, return errors' contents
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id}).then(profile => {
            //this is the experience object, experience will not be a collection, its an array within the profile
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            //add to experience array
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        });
    }
);

module.exports = router;
