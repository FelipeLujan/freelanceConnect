//libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { ButtonComponent } from "../common/SubmitButton";

//actions
import { addEducation } from "../../actions/profileActions";
import { GoBackButton } from "../common/GoBackButton";

//after i send the form, an action is called, in order to redirect after sending the action, with Router is needed

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    //this action will redirect upon submitting, this is why withRouter is required
    this.props.addEducation(eduData, this.props.history);
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
              <GoBackButton />
              <h1 className="display-4 text-center">Add education</h1>
              <p className="lead text-center">
                Tell us a little bit of what you have studied (college,
                bootcamp, etc).
              </p>
              <small className="d-block pb-3">* required field.</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={"* School"}
                  name={"school"}
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder={"* Degree or certification"}
                  name={"degree"}
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />

                <TextFieldGroup
                  placeholder={"Field of Study (sciences, math, etc.)"}
                  name={"fieldofstudy"}
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
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
                </div>
                <TextAreaFieldGroup
                  placeholder={"Program Description"}
                  name={"description"}
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info={"Tell us about the program that you were in."}
                />
                <ButtonComponent />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    errors: state.errors,
    addExperience: PropTypes.func.isRequired
  };
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
