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
