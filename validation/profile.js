//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

function validateProfileInput(data) {
  let errors = {};
  //this errors object will be populated with errors coming from the following validations

  /*if the user input is nothing, it wont be an emty string, it could be null or undefined.
    * so the main purpose of this ternary operator is tu give an empty STRING so it can be checked
    * with validator*/
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  /*The way validator works, is checking if the given input complies with the method(isEmail, isLength..)
    if so, return true
    - input to be check must be a string*/

  if (!validator.isLength(data.handle, { min: 5, max: 40 })) {
    errors.handle = "The handle must be between 5 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "The handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "The status field is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "The skills field is required";
  }

  //some more validations on optional fields
  if (!isEmpty(data.website)) {
    //these if statements are going to check if the fields are not empty, if they are not, check the content
    if (!validator.isURL(data.website)) {
      errors.website = "Please use a URL format.";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Please use a URL format.";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Please use a URL format.";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Please use a URL format.";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Please use a URL format.";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Please use a URL format.";
    }
  }

  return {
    //"errors" is an object with the errors collected form the checks
    //isValid will be a boolean resulting from evaluating isEmpty
    errors: errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateProfileInput;
