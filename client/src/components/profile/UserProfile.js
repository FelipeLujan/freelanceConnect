import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//components
import UserProfileGithub from "./UserProfileGithub";
import UserProfileCredentials from "./UserProfileCredentials";
import UserProfileAbout from "./UserProfileAbout";
import UserProfileHeader from "./UserProfileHeader";
import Spinner from "../common/Spinner";

//actions
import { getProfileByHandle } from "../../actions/profileActions";

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                className={"btn btn-primary float-left mb-3"}
                to={"/profiles"}
              >
                Back to profiles
              </Link>
            </div>{" "}
            <div className="col-md-6" />
          </div>
          <UserProfileHeader profile={profile} />
          <UserProfileAbout profile={profile} />
          <UserProfileCredentials
            education={profile.education}
            experienc={profile.experience}
          />
          <UserProfileGithub />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className={"container"}>
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(withRouter(UserProfile));
