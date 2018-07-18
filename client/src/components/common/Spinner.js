import React from "react";
import spinner from "./Spinner.gif";

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
