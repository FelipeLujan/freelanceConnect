import React from "react";
import PropTypes from "prop-types";

const NotFound = props => {
  return (
    <div>
      <h1 className="display4"> Page not found</h1>
      <p>Sorry, this page does not exist.</p>
    </div>
  );
};

NotFound.propTypes = {};

export default NotFound;
