import React, { Component } from "react";
import { Button, Divider } from "semantic-ui-react";
import moment from "moment";
import { DateRange } from "react-date-range";
import AddProcesCtA from "../../ctas/AddProcesCtA";
import ListProcese from "../forms/ListProcese";


class ProcesePage extends Component {
  state = {
    startDate: null,
    endDate: null
  };

  handleSelect = range => {
    this.setState({
      startDate: moment(range.startDate._d).format("YYYY-MM-DD"),
      endDate: moment(range.endDate._d).format("YYYY-MM-DD")
    });
  };

  onClick = () => {
    // window.location.reload();
    this.setState({ startDate: null, endDate: null });
  };

  render() {
    const { startDate, endDate } = this.state;
    return (

      <div>
        <h1 align="center" style={{ padding: "15px" }}>Procese verbale</h1>
        <AddProcesCtA/>
        <div align="center">
          <DateRange onChange={this.handleSelect}/>
          <Button onClick={this.onClick}>Reseteaza data</Button>
        </div>
        <Divider/>
        <ListProcese startDate={startDate} endDate={endDate}/>
      </div>
    );
  }
}

export default ProcesePage;
