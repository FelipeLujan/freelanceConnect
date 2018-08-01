import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

class UserProfileCredentials extends Component {
  render() {
    const { experience, education } = this.props;
    const experienceItem = experience.map(experience => (
      <li key={experience._id} className={"list-group-item"}>
        <h4>{experience.company}</h4>
        <p>
          <Moment format={"YYYY/MM/DD"}>{experience.from}</Moment> -{" "}
          {experience.to === null ? (
            "now"
          ) : (
            <Moment format={"YYYY/MM/DD"}>{experience.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {experience.title}
        </p>

        <p>
          {experience.location === "" ? null : (
            <span>
              <strong>Location: </strong>
              {experience.location}
            </span>
          )}
        </p>
        <p>
          {experience.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {experience.description}
            </span>
          )}
        </p>
      </li>
    ));

    const educationItem = education.map(education => (
      <li key={education._id} className={"list-group-item"}>
        <h4>{education.school}</h4>
        <p>
          <Moment format={"YYYY/MM/DD"}>{education.from}</Moment> -{" "}
          {education.to === null ? (
            "now"
          ) : (
            <Moment format={"YYYY/MM/DD"}>{education.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {education.degree}
        </p>
        <p>
          <strong>Field of study:</strong> {education.fieldofstudy}
        </p>
        <p>
          {education.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {education.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className={"row"}>
        <div className="col-md-6">
          <h3 className={"text-center text-info"}>Experience</h3>
          {/*here imma check if any experience items were found*/}
          {experienceItem.length > 0 ? (
            <ul className={"list-group"}> {experienceItem}</ul>
          ) : (
            <p className={"text-center"}>No experience entered yet.</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className={"text-center text-info"}>Education</h3>
          {/*here imma check if any experience items were found*/}
          {educationItem.length > 0 ? (
            <ul className={"list-group"}> {educationItem}</ul>
          ) : (
            <p className={"text-center"}>No Education entered yet.</p>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(UserProfileCredentials);
