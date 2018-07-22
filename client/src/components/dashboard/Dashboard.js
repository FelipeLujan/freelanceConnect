//libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//React-redux actions
import { deleteAccount, getCurrentProfile } from "../../actions/profileActions";

//components
import Spinner from "../common/Spinner";
import ProfileActionsComponent from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(event) {
    this.props.deleteAccount();
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
        dashBoardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActionsComponent />
            {/*TODO experience and education*/}
            <div>
              <div style={{ marginBottom: "60 px" }}>
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        );
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
