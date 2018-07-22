import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/inputGroup";
import SelectListGroup from "../common/SelectListGroupGroup";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    //gitlog test
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /*END CONSTRUCTOR*/

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    console.log(nextProps.errors);
  }

  onSubmit(event) {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder={"Twitter"}
            name={"twitter"}
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            icon={"fab fa-twitter"}
          />

          <InputGroup
            placeholder={"Facebook"}
            name={"facebook"}
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            icon={"fab fa-facebook"}
          />

          <InputGroup
            placeholder={"Instagram"}
            name={"instagram"}
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            icon={"fab fa-instagram"}
          />

          <InputGroup
            placeholder={"LinkedIn"}
            name={"linkedin"}
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
            icon={"fab fa-linkedin"}
          />
        </div>
      );
    }

    //select option for status
    const options = [
      {
        label: "Select professional Status",
        value: 0
      },
      {
        label: "Software Developer",
        value: "Software Developer"
      },
      {
        label: "Junior Web Developer",
        value: "Junior Web Developer"
      },
      {
        label: "Senior Web Developer",
        value: "Senior Web Developer"
      },
      {
        label: "Project Manager",
        value: "Project Manager"
      },
      {
        label: "Instructor or teacher",
        value: "Instructor or teacher"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];
    return (
      <div className={"create-profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className={"display-4 text-center"}>Create Your Profile.</h1>
              <p className="lead text-center">Please fill your info.</p>
              <small className={"d-block pb-3 text-center"}>
                * required Fields.
              </small>

              <form onSubmit={this.onSubmit}>
                {/*handle*/}
                <TextFieldGroup
                  placeholder={"Nickname"}
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info={
                    "A unique handle for your profile (AKA username/avatar/nickname) "
                  }
                />
                {/*Select*/}
                <SelectListGroup
                  name={"status"}
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info={"What is your current job status?"}
                />
                <TextFieldGroup
                  placeholder={"Company"}
                  name={"company"}
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info={
                    "Where have you worked so far? Somebody's company or your own."
                  }
                />
                <TextFieldGroup
                  placeholder={"http:// ..."}
                  name={"website"}
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info={"Could be your portfolio or your company's website."}
                />
                <TextFieldGroup
                  placeholder={"Location"}
                  name={"location"}
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info={"The main location where this job took place."}
                />
                <TextFieldGroup
                  placeholder={"HTML, CSS, JavaScript"}
                  name={"skills"}
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info={"Please separate each topic with a comma (,)"}
                />
                <TextFieldGroup
                  placeholder={"Github username"}
                  name={"githubusername"}
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info={
                    "If you want your latest projects to show up in your profile, please fill in this field."
                  }
                />
                <TextAreaFieldGroup
                  placeholder={"A short description of your profile"}
                  name={"bio"}
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info={"Tell us a little bit about you."}
                />

                <div className="bm-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-secondary"
                  >
                    Add Social Network Links
                  </button>
                  <span className={"small"}>Optional</span>
                </div>
                {socialInputs}
                <input
                  type={"submit"}
                  value={"submit"}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
