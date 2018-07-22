import React from "react";
import PropTypes from "prop-types";
import Classnames from "classnames";

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option value={option.value} key={option.label}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      {/*text areas dont need closing tag in react...*/}
      <select
        className={Classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>

      {info && <small className="form-text text-muted">{info}</small>}
      {{ error } && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

SelectListGroup.defaultProps = {
  type: "text"
};

export default SelectListGroup;
