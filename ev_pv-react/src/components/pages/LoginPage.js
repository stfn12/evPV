import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push("/procese"));

  render() {
    return (
      <div>
        <h1 align="center">Evidenta procese verbale controlori</h1>
        <h2>Login</h2>
        <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);