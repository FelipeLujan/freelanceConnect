import React, { Component } from "react";

//libraries
import axios from "axios"; // use the proxy to send http requests
import classnames from "classnames"; // add classes to html tags (ngIf)

class Register extends Component {
  //unless redux is implemented, component state must be set.
  //component state is set up in a constructor

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //axios sends .post(string, content) to proxy+string
    // proxy was set up in package.json

    //the back end returns the user if the post request is successful.
    //or the errors if .catch(), if i get an error, i send it to state
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      //currently res.data is the data sent by the back end
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    //  const errors = this.state.errors is the same than
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>

              <p className="lead text-center">
                Create your DevConnector account
              </p>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  {/*====NAME====*/}
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                      //classnames ('default_classes', 'conditional_class':condition<boolean>)
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  {/*====EMAIL====*/}
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>

                <div className="form-group">
                  {/*====PASSWORD====*/}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="form-group">
                  {/*====PASSWORD2====*/}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
