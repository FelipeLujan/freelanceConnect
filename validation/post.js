//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
    //this function will be reached from the outside to validate user input when registering

    let errors = {};
    //this errors object will be populated with errors coming from the following validations

    data.text = !isEmpty(data.text) ? data.text : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    /*The way validator works, is checking if the given input complies with the method(isEmail, isLength..)
      if so, return true
      - input to be check must be a string*/

    if (!validator.isLength(data.text, {min: 2, max: 255})) {
        errors.text = "Your post must be between 2 and 255 characters";
    }

    if (validator.isEmpty(data.text)) {
        errors.text = "Please enter your post.";
    }

    return {
        //"errors" is an object with the errors collected form the checks
        //isValid will be a boolean resulting from evaluating isEmpty
        errors: errors,
        isValid: isEmpty(errors)
    };
};
