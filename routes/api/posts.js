/*stuff that has to do with users and auth*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

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

//@route    GET api/posts/
//@desc     retrieve all posts
//@access   public
router.get("/", (req, res) =>
  Post.find()
    //sort by date
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfoun: "No posts have been found." })
    )
);

//@route    GET api/posts/:id
//@desc     retrieve a specific post with it's id
//@access   public
router.get("/:id", (req, res) =>
  Post.findById(req.params.id)
    //sort by date
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "Such post does not exist." })
    )
);

//@route    POST api/posts/
//@desc     create post
//@access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //validate user input
    if (!isValid) {
      //if not valid
      return res.status(400).json(errors);
    }
    // A new post containing all the stuff specified in the Post Model
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route    DELETE api/posts/:id
//@desc     Delete a post
//@access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })

      //Get the ID of the logged in user
      .then(profile => {
        Post.findById(req.params.id)

          //check if user is the post owner
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: "Unauthorized." });
            }

            //delete
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err =>
                res.status(404).json({ postnotfound: "Post not found." })
              );
          });
      });
  }
);

//@route    POST api/posts/like/:id
//@desc     Like somebody's post
//@access   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })

      //Get the ID of the logged in user
      .then(profile => {
        Post.findById(req.params.id)

          //check if user is the post owner
          .then(post => {
            //check if the user has already liked the post
            if (
              //the likes array contains the ids of the users who liked
              //here we get the entries === to req.body.id
              // if more than 0 entries are found, the user has already liked that post
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "You already liked this post." });
            }

            //if the user hasn't liked the post, add his id to the likes array
            post.likes.unshift({
              user: req.user.id
            });

            //from server, send to DB
            post.save().then(post => res.json(post));
          });
      });
  }
);

//@route    POST api/posts/unlike/:id
//@desc     unlike a previously liked comment
//@access   private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })

      //Get the ID of the logged in user
      .then(profile => {
        Post.findById(req.params.id)

          //check if user is the post owner
          .then(post => {
            //check if the user has already liked the post
            if (
              //the likes array contains the ids of the users who liked
              //here we get the entries === to req.body.id
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notliked: "User haven't liked this post." });
            }

            //find user's index in the likes array
            const removeIndex = post.likes.map(item =>
              item.user.toString().indexOf(req.user.id)
            );

            //remove user's id from the likes array
            post.likes.splice(removeIndex, 1);

            //from server, send to DB
            post.save().then(post => res.json(post));
          });
      });
  }
);

//@route    POST api/posts/comment/:id
//@desc     add comment to a post
//@access   private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Post validation works here because comment request has the same content (text)
    const { errors, isValid } = validatePostInput(req.body);

    //validate user input
    if (!isValid) {
      //if not valid
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      //add newComment to comments array
      post.comments.unshift(newComment);

      //save
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: "Post not Found" }));
    });
  }
);

//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     remove comment from a post
//@access   private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      //check to see if the comment is containes in that post
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ commentnotexists: "Comment not found." });
      }

      //if the comment exists for the post. get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      //splice found comment
      post.comments.splice(removeIndex, 1);

      //save
      post.save().then(post => res.json(post));
    });
  }
);

module.exports = router;
