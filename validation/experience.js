//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

//this function will be reached from the outside to validate user input when registering
module.exports = function validateExperience(data) {
  //this errors object will be populated with errors coming from the following validations
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  /*The way validator works, is checking if the given input complies with the method(isEmail, isLength..)
        if so, return true
        - input to be check must be a string*/
  if (validator.isEmpty(data.title)) {
    errors.title = "Please enter the position you occupied for that job.";
  }

  if (validator.isEmpty(data.company)) {
    errors.company =
      "Please enter the name of the company, or type self employed";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    //"errors" is an object with the errors collected form the checks
    //isValid will be a boolean resulting from evaluating isEmpty
    errors: errors,
    isValid: isEmpty(errors)
  };
};

// module.exports = validateExperience;
