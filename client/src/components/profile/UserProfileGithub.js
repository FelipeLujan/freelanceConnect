import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfileGithub extends Component {
  render() {
    return (
      <div>
        <h1>TODO: Profile github</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(UserProfileGithub);
