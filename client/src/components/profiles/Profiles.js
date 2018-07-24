import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    //  this will get profiles and set them to state
    this.props.getProfiles();
  }

  render() {
    //the state has the profiles array and loading
    const { profiles, loading } = this.props.profile;
    let profileItems;
    //if there are no profiles, or loading is true, show spinner
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      //is there are profiles, show them
      if (profiles.length > 0) {
        profileItems = <h1>Profiles found</h1>;
      } else {
        //if profiles has les than 0 items, means there are no profiles
        profileItems = <h4>...No profiles found :(</h4>;
      }
    }
    return (
      <div className={"profiles"}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> Developer Profiles</h1>
              <p className="lead text-center">Connect with other devs!</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
