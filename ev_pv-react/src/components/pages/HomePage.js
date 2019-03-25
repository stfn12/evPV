import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const HomePage = ({ isAuthenticated }) => (
  <div>
    <h1>Evidenta procese verbale controlori</h1>
    {isAuthenticated ? <Redirect to="/procese"/> : <Redirect to="/login"/>}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.name
  };
}

export default connect(mapStateToProps)(HomePage);