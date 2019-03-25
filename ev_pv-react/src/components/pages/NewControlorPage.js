/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewControlorForm from "../forms/NewControlorForm";
import { addControlor } from "../../actions/controlori";

class NewControlorPage extends React.Component {

  submit = data =>
    this.props.addControlor(data).then(() => this.props.history.push("/controlori"));

  render() {
    return (
      <div>
        <h1 style={{ padding: "15px" }}>Adauga controlor</h1>
        <NewControlorForm submit={this.submit} addControlor={addControlor()}/>
      </div>
    );
  }
}

NewControlorPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  addControlor: PropTypes.func.isRequired
};

export default connect(null, { addControlor })(NewControlorPage);