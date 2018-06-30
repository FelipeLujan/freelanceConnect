//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

function validateRegisterInput(data) {
  //this function will be reached from the outside to validate user input when registering

  let errors = {};
  //this errors object will be populated with errors coming from the following validations

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  //they way validator works, is checking if STRINGS are empty. if req.name is not filled, it wouldn't
  //be a string, so it must be set to a string beforehand

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be longer than 2 and shorter than 30 characters.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Please fill in your name.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Please enter your e-mail.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a correct E-mail.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Uhhmm... your profile needs a password, right?";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Your password needs to be at least 6 characters.";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password.";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match.";
  }

  return {
    //"errors" is an object with the errors collected form the checks
    //isValid will be a boolean resulting from evaluating isEmpty
    errors: errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
