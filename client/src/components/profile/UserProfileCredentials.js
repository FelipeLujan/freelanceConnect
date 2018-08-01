import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

class UserProfileCredentials extends Component {
  render() {
    return (
      <div>
        <h1>TODO: Profile credentials</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(UserProfileCredentials);
