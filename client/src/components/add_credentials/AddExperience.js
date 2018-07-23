//libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

//after i send the form, an action is called, in order to redirect after sending the action, with Router is needed

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      disabled: false,
      current: false,
      description: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCheck(event) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className={"add-experience"}>
        <div className={"container"}>
          <div className={"row"}>
            <div className="col-md-8 m-auto">
              <Link className={"btn btn-light"} to={"/dashboard"}>
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position (current or previous)
              </p>
              <small className="d-block pb-3">* required field.</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={"* Company"}
                  name={"company"}
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder={"* Job Title"}
                  name={"title"}
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup
                  placeholder={"Location"}
                  name={"location"}
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  name={"from"}
                  type={"date"}
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>to date</h6>

                <TextFieldGroup
                  name={"to"}
                  type={"date"}
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                {/*no special component for this one*/}
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className={"form-check-input"}
                    name={"current"}
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id={"current"}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                  <TextAreaFieldGroup
                    placeholder={"Job Description"}
                    name={"description"}
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info={"Let us now what you used to do in that job."}
                  >
                    <input
                      type="submit"
                      value={"submit"}
                      className={"btn btn-block btn-info mt-4"}
                    />
                  </TextAreaFieldGroup>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile, errors: state.errors };
}

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withRouter(AddExperience));
