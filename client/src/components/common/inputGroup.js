import React from "react";
import PropTypes from "prop-types";
import Classnames from "classnames";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  type
}) => {
  return (
    <div className="inout-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group text">
          <i className={icon} />
        </span>
      </div>
      {/*text areas dont need closing tag in react...*/}
      <input
        className={Classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />

      {{ error } && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
