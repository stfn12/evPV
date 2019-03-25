/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewProcesForm from "../forms/NewProcesForm";
import { addProces } from "../../actions/procese";

class NewProcesPage extends React.Component {

  submit = data =>
    this.props.addProces(data).then(() => this.props.history.push("/procese"));

  render() {
    return (
      <div>
        <h1 style={{ padding: "15px" }}>Adauga PV</h1>
        <NewProcesForm submit={this.submit} addProces={addProces}/>
      </div>
    );
  }
}

NewProcesPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  addProces: PropTypes.func.isRequired
};

export default connect(null, { addProces })(NewProcesPage);