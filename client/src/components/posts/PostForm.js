import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

//actions
import { addPost } from "../../actions/postactions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    PostForm.onSubmit = PostForm.onSubmit.bind(this);
  }

  static onSubmit(event) {
    event.preventDefault();

    //the user needs to be obtained because it's going to be sent along the post
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={PostForm.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder={"Create a new post"}
                  name={"text"}
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
