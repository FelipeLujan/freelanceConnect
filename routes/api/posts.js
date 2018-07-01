/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

//Validation
const validatePostInput = require("../../validation/post");

//@route    GET api/posts/tests
//@desc     test post route
//@access   public
router.get("/test", (req, res) =>
  res.json({
    msg: "post works"
  })
);

//@route    POST api/posts/
//@desc     create post
//@access   private
router.post(
    "/",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const {errors, isValid} = validatePostInput(req.body);

        //validate user input
        if (!isValid) {
            //if not valid
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newPost.save().then(post => res.json(post));
    }
);

module.exports = router;
