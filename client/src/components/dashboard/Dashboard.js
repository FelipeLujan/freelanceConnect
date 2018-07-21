import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if (profile === null || loading === true) {
      dashBoardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashBoardContent = <h4>TODO:Display Profile</h4>;
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}</p>
            <p>Please set up your profile</p>
            <Link className={"btn btn-lg btn-info"} to={"/create-profile"}>
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className={"dashboard"}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
            </div>
            {dashBoardContent}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);