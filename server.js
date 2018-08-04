const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// initialize express
// nodemon can auto update the server on changes

// ===========================DB config======================================
const db = require("./config/keys").mongoURI;

// ===========================Connect To mongoDB======================================
mongoose
  .connect(db)
  .then(() => console.log("mongoDB Connected"))
  .catch(error => console.log(error));

// ===========================BodyParser middleware config======================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());

//in passport we could use many strategies, this time a JWT strategy
require("./config/passport")(passport);

/*===========================ROUTES======================================*/
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//server static assets if in production, serve index.html inside build/stat
if (process.env.NODE_ENV === "production") {
  //set static
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
// process.env.PORT  is the port needed for heroku deploy, otherwise run on port  5000
app.listen(port, () => console.log(`server running on port ${port}`));
