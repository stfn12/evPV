/* eslint-disable react/destructuring-assignment,no-underscore-dangle,react/prop-types */
import React, { Component } from "react";
import { Button, Divider, Dropdown, Segment } from "semantic-ui-react";
import moment from "moment";
import { DateRange } from "react-date-range";
import { connect } from "react-redux";
import AddProcesCtA from "../../ctas/AddProcesCtA";
import ListProcese from "../forms/ListProcese";


class ProcesePage extends Component {
  state = {
    startDate: null,
    endDate: null,
    query: "",
    options: [],
    loading: false
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

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChangeQuery = (e, data) => {
    clearTimeout(this.timer2);
    this.timer2 = setTimeout(this.setState({ query: data.value }), 1000);
  };

  fetchOptions = () => {
    const { procese } = this.props;
    const options = [];
    procese.forEach(proces => {
      const data = moment(proces.data_proces).format("DD-MM-YYYY");
      options.push({
        key: proces._id,
        value: proces.contravenient,
        text: `${proces.contravenient} ${data} ${proces.adresa}`
      });
    });
    this.setState({ loading: false, options});
  };

  render() {
    const { startDate, endDate, query, options, loading } = this.state;
    return (

      <div>
        <h1 align="center" style={{ padding: "15px" }}>Procese verbale</h1>
        <AddProcesCtA/>
        <div align="center">
          <DateRange onChange={this.handleSelect}/>
          <Button onClick={this.onClick}>Reseteaza data</Button>
        </div>
        <Divider/>
        <Segment>
          <Dropdown
            search
            fluid
            placeholder="Cauta PV dupa contravenient"
            value={query}
            onSearchChange={this.onSearchChange}
            options={options}
            loading={loading}
            onChange={this.onChangeQuery}
          />
        </Segment>
        <ListProcese startDate={startDate} endDate={endDate} query={query}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    procese: state.procese
  };
}

export default connect(mapStateToProps)(ProcesePage);
