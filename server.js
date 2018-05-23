const express = require("express");
const app = express();
// initialize express
// nodemon can auto update the server on changes
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// ===========================DB config======================================
const db = require("./config/keys").mongoURI;

// ===========================Connect To mongoDB======================================
mongoose
  .connect(db)
  .then(() => console.log("mongoDB Connected"))
  .catch(error => console.log(error));

// ===========================ROUTES======================================
app.get("/", (req, res) => res.send("hello"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
// process.env.PORT  is the port needed for heroku deploy, otherwise run on port  5000
app.listen(port, () => console.log(`server running on port ${port}`));
