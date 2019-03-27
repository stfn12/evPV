/* eslint-disable no-underscore-dangle,react/jsx-no-bind,camelcase,react/destructuring-assignment,react/no-access-state-in-setstate,react/prop-types,prefer-destructuring */
import React, { Component } from "react";
import { Button, Form, Icon, Label, Modal, Table } from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactExport from "react-data-export";
import { getProcese, editProces, deleteProces, getProceseDate } from "../../actions/procese";
import InlineError from "../messages/InlineError";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ListProcese extends Component {
  state = {
    procese: {},
    loading: true,
    errors: {},
    open: false,
    editProcesData: {
      _id: "",
      serie: "",
      numar: "",
      data_proces: "",
      marca: "",
      contravenient: "",
      adresa: "",
      suma: "",
      mod_intocmire: "",
      platit: "",
      numar_chitanta: "",
      data_chitanta: "",
      suma_chitanta: ""
    },
    startDate: null,
    endDate: null
  };

  componentWillMount() {
    this.props.getProcese()
      .then(data => this.setState({ procese: data.procese, loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true, startDate: nextProps.startDate, endDate: nextProps.endDate });
    const { startDate, endDate } = this.state;
    if ((nextProps.startDate === null || nextProps.endDate === null) && startDate !== nextProps.startDate) {
      this.props.getProcese()
        .then(data => this.setState({ procese: data.procese, loading: false }));
    }
    else if (startDate !== nextProps.startDate || endDate !== nextProps.endDate) {
      const date = { startDate: nextProps.startDate, endDate: nextProps.endDate };
      this.props.getProceseDate(date)
        .then(data => this.setState({ procese: data.procese, loading: false }));
    }
  }

  validate = data => {
    const errors = {};
    if (!data.serie) errors.serie = "Campul nu poate fi gol";
    if (!data.numar) errors.numar = "Campul nu poate fi gol";
    if (!data.marca) errors.marca = "Campul nu poate fi gol";
    if (!data.contravenient) errors.contravenient = "Campul nu poate fi gol";
    return errors;
  };

  onChange = e => {
    this.setState({
      editProcesData: { ...this.state.editProcesData, [e.target.name]: e.target.value }
    });
  };

  editProcesSubmit = (e) => {
    const { editProcesData } = this.state;
    e.preventDefault();
    const errors = this.validate(editProcesData);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.editProces(editProcesData)
        .then(this.close())
        .then(this.props.getProcese()
          .then(data => this.setState({ procese: data.procese, loading: false })));
    }
  };

  deleteProces = (id) => {
    this.props.deleteProces(id)
      .then(this.props.getProcese()
        .then(data => this.setState({ procese: data.procese, loading: false })));
  };

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  editProcesModal = (_id, serie, numar, data_proces, marca, contravenient, adresa, suma, mod_intocmire, platit, numar_chitanta, data_chitanta, suma_chitanta) => {
    this.show();
    this.setState({
      editProcesData: {
        _id,
        serie,
        numar,
        data_proces,
        marca,
        contravenient,
        adresa,
        suma,
        mod_intocmire,
        platit,
        numar_chitanta,
        data_chitanta,
        suma_chitanta
      }
    });
  };

  render() {
    let { procese } = this.state;
    const process = procese;
    const { loading, errors, open, editProcesData } = this.state;
    if (loading)
      return (<div/>);
    procese = procese.map((proces) => {
      // if (procese.data_proces >= startDate && procese.data_proces <= endDate)
      return (
        <Table.Row key={proces._id}>
          <Table.Cell>{proces.serie}</Table.Cell>
          <Table.Cell>{proces.numar}</Table.Cell>
          <Table.Cell>{moment(proces.data_proces).format("DD/MM/YYYY")}</Table.Cell>
          <Table.Cell>{proces.marca}</Table.Cell>
          <Table.Cell>{proces.contravenient}</Table.Cell>
          <Table.Cell>{proces.adresa}</Table.Cell>
          <Table.Cell>{proces.suma}</Table.Cell>
          <Table.Cell>{proces.platit}</Table.Cell>
          <Table.Cell>
            <Button positive
                    onClick={this.editProcesModal.bind(this, proces._id, proces.serie, proces.numar, proces.data_proces, proces.marca, proces.contravenient, proces.adresa, proces.suma, proces.mod_intocmire, proces.platit, proces.numar_chitanta, proces.data_chitanta, proces.suma_chitanta)}>
              Editeaza</Button>
            {/*
              <Button negative
                    onClick={() => window.confirm("Esti sigur ca stergi?") && this.deleteProces(proces._id)}> Sterge </Button>
            */}
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div>
        <ExcelFile
          filename={`Procese ${this.props.startDate !== null ? moment(this.props.startDate).format("DD-MM-YYYY") : ""} _ ${this.props.endDate !== null ? moment(this.props.endDate).format("DD-MM-YYYY") : ""}`}
          element={<Button icon labelPosition='right'><Icon name='print' size='big'/>Descarca excel</Button>}>
          <ExcelSheet data={process} name="Procese verbale">
            <ExcelColumn label="Serie" value="serie"/>
            <ExcelColumn label="Numar" value="numar"/>
            <ExcelColumn label="Data" value="data_proces"/>
            <ExcelColumn label="Marca" value="marca"/>
            <ExcelColumn label="Contravenient" value="contravenient"/>
            <ExcelColumn label="Adresa" value="adresa"/>
            <ExcelColumn label="Suma" value="suma"/>
            <ExcelColumn label="Mod intocmire" value="mod_intocmire"/>
            <ExcelColumn label="Platit" value="platit"/>
            <ExcelColumn label="Numar chitanta" value="numar_chitanta"/>
            <ExcelColumn label="Data chitanta" value="data_chitanta"/>
            <ExcelColumn label="Suma chitanta" value="suma_chitanta"/>
          </ExcelSheet>
        </ExcelFile>

        <Table celled compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Serie</Table.HeaderCell>
              <Table.HeaderCell>Numar</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Controlor</Table.HeaderCell>
              <Table.HeaderCell>Contravenient</Table.HeaderCell>
              <Table.HeaderCell>Adresa</Table.HeaderCell>
              <Table.HeaderCell>Suma</Table.HeaderCell>
              <Table.HeaderCell>Platit</Table.HeaderCell>
              <Table.HeaderCell>Actiuni</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {procese}
          </Table.Body>
        </Table>

        <Modal open={open} onClose={this.close} size="tiny">
          <Modal.Header>Editeaza proces</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field error={!!errors.serie}>
                <Label htmlFor="serie">Serie</Label>
                <input type="text"
                       id="serie"
                       name="serie"
                       placeholder="serie"
                       value={editProcesData.serie || ""}
                       onChange={this.onChange}/>
                {errors.serie && <InlineError text={errors.serie}/>}
              </Form.Field>

              <Form.Field error={!!errors.numar}>
                <Label htmlFor="numar">Numar</Label>
                <input type="text"
                       id="numar"
                       name="numar"
                       placeholder="numar"
                       value={editProcesData.numar || ""}
                       onChange={this.onChange}/>
                {errors.numar && <InlineError text={errors.numar}/>}
              </Form.Field>

              <Form.Field error={!!errors.data_proces}>
                <Label htmlFor="data_proces">Data intocmire</Label>
                <input type="date"
                       id="data_proces"
                       name="data_proces"
                       placeholder="data"
                       value={moment(editProcesData.data_proces).format("YYYY-MM-DD") || ""}
                       onChange={this.onChange}/>
                {errors.data_proces && <InlineError text={errors.data_proces}/>}
              </Form.Field>

              <Form.Field error={!!errors.marca}>
                <Label htmlFor="marca">Marca controlor</Label>
                <input type="number"
                       id="marca"
                       name="marca"
                       placeholder="marca"
                       value={editProcesData.marca || ""}
                       onChange={this.onChange}/>
                {errors.marca && <InlineError text={errors.marca}/>}
              </Form.Field>

              <Form.Field error={!!errors.contravenient}>
                <Label htmlFor="contravenient">Contravenient</Label>
                <input type="text"
                       id="contravenient"
                       name="contravenient"
                       placeholder="nume contravenient"
                       value={editProcesData.contravenient || ""}
                       onChange={this.onChange}/>
                {errors.contravenient && <InlineError text={errors.contravenient}/>}
              </Form.Field>

              <Form.Field error={!!errors.adresa}>
                <Label htmlFor="adresa">Adresa</Label>
                <input type="text"
                       id="adresa"
                       name="adresa"
                       placeholder="adresa"
                       value={editProcesData.adresa || ""}
                       onChange={this.onChange}/>
                {errors.adresa && <InlineError text={errors.adresa}/>}
              </Form.Field>

              <Form.Field error={!!errors.suma}>
                <Label htmlFor="suma">Suma</Label>
                <input type="number"
                       id="suma"
                       name="suma"
                       placeholder="suma"
                       value={editProcesData.suma || ""}
                       onChange={this.onChange}/>
                {errors.suma && <InlineError text={errors.suma}/>}
              </Form.Field>

              <Form.Field error={!!errors.mod_intocmire}>
                <Label htmlFor="mod_intocmire">Mod intocmire</Label>
                <input type="text"
                       id="mod_intocmire"
                       name="mod_intocmire"
                       placeholder="mod intocmire"
                       value={editProcesData.mod_intocmire || ""}
                       onChange={this.onChange}/>
                {errors.mod_intocmire && <InlineError text={errors.mod_intocmire}/>}
              </Form.Field>

              <Form.Field error={!!errors.platit}>
                <Label htmlFor="platit">Platit</Label>
                <input type="text"
                       id="platit"
                       name="platit"
                       placeholder="da / nu"
                       value={editProcesData.platit || ""}
                       onChange={this.onChange}/>
                {errors.platit && <InlineError text={errors.platit}/>}
              </Form.Field>

              <Form.Field error={!!errors.numar_chitanta}>
                <Label htmlFor="numar_chitanta" color="red">Numar chitanta</Label>
                <input type="text"
                       id="numar_chitanta"
                       name="numar_chitanta"
                       placeholder="Numar chitanta"
                       value={editProcesData.numar_chitanta || ""}
                       onChange={this.onChange}/>
                {errors.numar_chitanta && <InlineError text={errors.numar_chitanta}/>}
              </Form.Field>

              <Form.Field error={!!errors.data_chitanta}>
                <Label htmlFor="data_chitanta" color="red">Data chitanta</Label>
                <input type="date"
                       id="data_chitanta"
                       name="data_chitanta"
                       placeholder="Data chitanta"
                       value={moment(editProcesData.data_chitanta).format("YYYY-MM-DD") || ""}
                       onChange={this.onChange}/>
                {errors.data_chitanta && <InlineError text={errors.data_chitanta}/>}
              </Form.Field>

              <Form.Field error={!!errors.suma_chitanta}>
                <Label htmlFor="suma_chitanta" color="red">Suma achitata</Label>
                <input type="text"
                       id="suma_chitanta"
                       name="suma_chitanta"
                       placeholder="Suma achitata"
                       value={editProcesData.suma_chitanta || ""}
                       onChange={this.onChange}/>
                {errors.suma_chitanta && <InlineError text={errors.suma_chitanta}/>}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button loading={loading} positive icon='checkmark' labelPosition='right' content='Editeaza'
                    onClick={this.editProcesSubmit}/>
            <Button negative content="Inapoi" onClick={this.close}/>
          </Modal.Actions>
        </Modal>

      </div>
    );
  }
}

ListProcese.propTypes = {
  getProcese: PropTypes.func.isRequired,
  editProces: PropTypes.func.isRequired,
  deleteProces: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    procese: state.procese
  };
}

export default connect(mapStateToProps, { getProcese, editProces, deleteProces, getProceseDate })(ListProcese);