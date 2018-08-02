//Styles
import "./App.css";

//React Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//react-redux
import { Provider } from "react-redux";

//STORE
import store from "./store";

//Components
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/Dashboard";
import AddExperience from "./components/add_credentials/AddExperience";
import AddEducation from "./components/add_credentials/AddEducation";
import NotFound from "./components/not-found/NotFound";

//auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

//profile
import { clearCurrentProfile } from "./actions/profileActions";

//guard for private routes
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/Create-Profile/CreateProfile";
import EditProfile from "./components/edit_profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import UserProfile from "./components/profile/UserProfile";
import Posts from "./components/posts/Posts";

//in order to have the user info and JWT token available anywhere the user goes
//it's needed to set up the auth state from localstorage
// check for token in localstorage
if (localStorage.jwtToken) {
  //if  localstorage.jtoToken exists (fill up the axios header)
  setAuthToken(localStorage.jwtToken);
  //decode and dispatch auth and isAuthenticated to state
  const decoded = jwt_decode(localStorage.jwtToken);
  setCurrentUser(decoded);
  store.dispatch(setCurrentUser(decoded));

  // also
  //log the user out once the jwt expires
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact component={Register} path="/register" />
              <Route exact component={Login} path="/login" />
              <Route exact component={Profiles} path="/profiles" />{" "}
              <Route exact component={UserProfile} path="/profile/:handle" />{" "}
              {/*this is unprotected route*/}
              <Switch>
                <PrivateRoute exact component={Dashboard} path="/dashboard" />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  component={CreateProfile}
                  path="/create-profile"
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  component={EditProfile}
                  path="/edit-profile"
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  component={AddExperience}
                  path="/add-experience"
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  component={AddEducation}
                  path="/add-education"
                />
              </Switch>
              <Switch>
                <PrivateRoute exact component={Posts} path="/feed" />
              </Switch>
              <Route exact component={NotFound} path="/notfound" />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
