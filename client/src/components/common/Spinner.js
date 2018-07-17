import React from "react";
import PropTypes from "prop-types";
import spinner from "./loading_spinner.gif";

const MyComponent = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

MyComponent.propTypes = {};

export default MyComponent;
