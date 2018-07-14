//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

function validateLoginInput(data) {
  //this function will be reached from the outside to validate user input when registering

  let errors = {};
  //this errors object will be populated with errors coming from the following validations

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  /*The way validator works, is checking if the given input complies with the method(isEmail, isLength..)
  if so, return true
  - input to be check must be a string*/

  if (validator.isEmpty(data.email)) {
    errors.email = "Please enter your e-mail.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a correct E-mail.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter your password in order to log in.";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Your password needs to be at least 6 characters.";
  }

  return {
    //"errors" is an object with the errors collected form the checks
    //isValid will be a boolean resulting from evaluating isEmpty
    errors: errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateLoginInput;
