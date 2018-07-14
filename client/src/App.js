//Styles
import "./App.css";

//React Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//REDUX
import { applyMiddleware, createStore } from "redux";

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

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

//in order to hace the user info and JWT token available anywhere the user goes
//it's needed to set up the auth state from localstorage
// check for token in localstorage
if (localStorage.jwtToken) {
  //if  localstorage.jtoToken exists (fill up the axios header)
  setAuthToken(localStorage.jwtToken);
  //decode and dispatch auth and isAuthenticated to state
  const decoded = jwt_decode(localStorage.jwtToken);
  setCurrentUser(decoded);
  store.dispatch(setCurrentUser(decoded));
}

store;
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
