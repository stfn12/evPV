import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ProcesePage from "./components/pages/ProcesePage";
import ControloriPage from "./components/pages/ControloriPage";
import NewProcesPage from "./components/pages/NewProcesPage";
import NewControlorPage from "./components/pages/NewControlorPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";

const App = ({ location, isAuthenticated }) =>
  <div className="ui container">
    {isAuthenticated && <TopNavigation/>}
    <Route location={location} path="/" exact component={HomePage}/>
    <GuestRoute location={location} path="/login" exact component={LoginPage}/>
    <UserRoute location={location} path="/procese" exact component={ProcesePage}/>
    <UserRoute location={location} path="/procese/adauga" exact component={NewProcesPage}/>
    <UserRoute location={location} path="/controlori" exact component={ControloriPage}/>
    <UserRoute location={location} path="/controlori/adauga" exact component={NewControlorPage}/>

  </div>;

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.name
  };

}

export default connect(mapStateToProps)(App);
