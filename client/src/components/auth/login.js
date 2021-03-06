import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

//components
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    //whatever is put into the input field, is going to be set as state
    //here we are constructing an object composed of [event.target.name]: event.target.value
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.errors);
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    //here is where the action is called
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>

              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>

              <form onSubmit={this.onSubmit}>
                {/*TextFieldGroup is the template input component that will
                morph into different kind of input fields depending on the
                props passed to TextFieldGroup component*/}
                <TextFieldGroup
                  placeholder="Email Address."
                  name="email"
                  type={"email"}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                {/*<div className="form-group">*/}
                {/*<input*/}
                {/*type="email"*/}
                {/*className={classnames("form-control form-control-lg", {*/}
                {/*"is-invalid": errors.email*/}
                {/*})}*/}
                {/*placeholder="Email Address"*/}
                {/*name="email"*/}
                {/*value={this.state.email}*/}
                {/*onChange={this.onChange}*/}
                {/*/>*/}
                {/*{errors.email && (*/}
                {/*<div className="invalid-feedback">{errors.email}</div>*/}
                {/*)}*/}
                {/*</div>*/}

                <TextFieldGroup
                  placeholder="Password."
                  name="password"
                  type={"password"}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //Here i choose what to get from state into this component (as props)
  //sooo
  //this.props.auth now contains the user object, so i could
  // this.props.user.name gives back the name
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
