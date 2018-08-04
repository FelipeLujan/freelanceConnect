import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UserProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "f0b6f3a9208e54136a1b",
      cleintsecret: "a58726f84d255b196112f1ad3788b2a0e2ef18f0",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div className={"card card-body mb-2"} key={repo.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              {" "}
              <Link
                to={repo.html_url}
                className={"text-info"}
                target={"_blank"}
              >
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Starts: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Starts: {repo.watchers_count}
            </span>
            <span className="badge badge-success ">
              Starts: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className={"mb-4"}>Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

UserProfileGithub.propTypes = {
  userName: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(UserProfileGithub);
