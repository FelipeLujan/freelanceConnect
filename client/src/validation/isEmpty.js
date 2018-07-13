const isEmpty = value =>
  //  this function is going ot check whether the input is empty or not
  value === undefined || //if the input is undefined
  value === null || // if the input is null
  (typeof value === "object" && Object.keys(value).length === 0) || // if the input is an object, but that input has 0 keys
  (typeof value === "string" && value.trim().length === 0); // if is a string of 0 length

/*isEmpty('')//?  => true*/

//if the value (input) is empty, returns TRUE
export default isEmpty;
