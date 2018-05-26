const mongoogse = require("mongoose");
const schema = mongoogse.Schema;

//create schema

const UserSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//this is what the user collection is going to have

User = mongoogse.model("users", UserSchema);
module.exports = User;
//this exports the mongoose model
