const JwTStrategy = require("passport-jwt").Strategy;
const ExtractJwT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

//these are the option for the JwT strategy
const opts = {};
opts.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>
  passport.use(
    new JwTStrategy(opts, (jwt_payload, done) =>
      User.findById(jwt_payload.id)
        //findById is a mongoose method, the jwt_payload contains the user info, including the id and the name

        .then(user => {
          //user is the result of findById
          if (user) {
            return done(null, user);
            //  done is a function passed to the new JwTStrategy, (the first argument is an error catcher, the second
            // is the result of JwTStrategy if executed correctly
            // so if the user is found by findById, then return the user
          }
          return done(null, false);
          //if not found return false
        })
        .catch(err => console.log(err))
    )
  );

//in order to put this strategy to work, it must be put in a certain route. As a middleware
