import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to={"/login"}/>
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
