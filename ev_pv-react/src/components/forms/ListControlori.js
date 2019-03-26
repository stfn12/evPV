/* eslint-disable prefer-destructuring,react/destructuring-assignment,react/no-access-state-in-setstate,no-underscore-dangle,react/jsx-no-bind */
import React, { Component } from "react";
import { Button, Form, Icon, Label, Modal, Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactExport from "react-data-export";
import { getControlori, editControlor, deleteControlor } from "../../actions/controlori";
import InlineError from "../messages/InlineError";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ListProcese extends Component {
  state = {
    controlori: {},
    loading: true,
    errors: {},
    open: false,
    editControlorData: {
      _id: "",
      marca: "",
      nume: ""
    }
  };

  componentWillMount() {
    this.props.getControlori()
      .then(data => this.setState({ controlori: data.controlori, loading: false }));
  }

  validate = data => {
    const errors = {};
    if (!data.marca) errors.marca = "Campul nu poate fi gol";
    if (!data.nume) errors.nume = "Campul nu poate fi gol";
    return errors;
  };

  onChange = e => {
    this.setState({
      editControlorData: { ...this.state.editControlorData, [e.target.name]: e.target.value }
    });
  };

  editControlorSubmit = (e) => {
    const { editControlorData } = this.state;
    e.preventDefault();
    const errors = this.validate(editControlorData);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.editControlor(editControlorData)
        .then(this.close())
        .then(this.props.getControlori()
          .then(data => this.setState({ controlori: data.controlori, loading: false })));
    }
  };

  deleteControlor = (id) => {
    this.props.deleteControlor(id)
      .then(this.props.getControlori()
        .then(data => this.setState({ controlori: data.controlori, loading: false })));
  };

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  editControlorModal = (_id, marca, nume) => {
    this.show();
    this.setState({
      editControlorData: {
        _id,
        marca,
        nume
      }
    });
  };

  render() {
    let { controlori } = this.state;
    const controlors = controlori;
    const { loading, errors, open, editControlorData } = this.state;
    if (loading)
      return (<div/>);
    controlori = controlori.map((controlor) => {
      // if (controlori.data_proces >= startDate && controlori.data_proces <= endDate)
      return (
        <Table.Row key={controlor._id}>
          <Table.Cell>{controlor.marca}</Table.Cell>
          <Table.Cell>{controlor.nume}</Table.Cell>
          <Table.Cell>
            <Button positive
                    onClick={this.editControlorModal.bind(this, controlor._id, controlor.marca, controlor.nume)}>
              Editeaza</Button>
            <Button negative
                    onClick={() => window.confirm("Esti sigur ca stergi?") && this.deleteControlor(controlor._id)}> Sterge </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div>
        <ExcelFile
          filename="Controlori"
          element={<Button icon labelPosition='right'><Icon name='print' size='big'/>Descarca excel</Button>}>
          <ExcelSheet data={controlors} name="Procese verbale">
            <ExcelColumn label="Marca" value="marca"/>
            <ExcelColumn label="Nume" value="nume"/>
          </ExcelSheet>
        </ExcelFile>

        <Table celled compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Marca</Table.HeaderCell>
              <Table.HeaderCell>Nume</Table.HeaderCell>
              <Table.HeaderCell>Actiuni</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {controlori}
          </Table.Body>
        </Table>

        <Modal open={open} onClose={this.close} size="tiny">
          <Modal.Header>Editeaza controlor</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field error={!!errors.marca}>
                <Label htmlFor="marca">Marca</Label>
                <input type="text"
                       id="marca"
                       name="marca"
                       placeholder="marca"
                       value={editControlorData.marca || ""}
                       onChange={this.onChange}/>
                {errors.marca && <InlineError text={errors.marca}/>}
              </Form.Field>

              <Form.Field error={!!errors.nume}>
                <Label htmlFor="nume">Nume</Label>
                <input type="text"
                       id="nume"
                       name="nume"
                       placeholder="nume"
                       value={editControlorData.nume || ""}
                       onChange={this.onChange}/>
                {errors.nume && <InlineError text={errors.nume}/>}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button loading={loading} positive icon='checkmark' labelPosition='right' content='Editeaza'
                    onClick={this.editControlorSubmit}/>
            <Button negative content="Inapoi" onClick={this.close}/>
          </Modal.Actions>
        </Modal>

      </div>
    );
  }
}

ListProcese.propTypes = {
  getControlori: PropTypes.func.isRequired,
  editControlor: PropTypes.func.isRequired,
  deleteControlor: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    controlori: state.controlori
  };
}

export default connect(mapStateToProps, { getControlori, editControlor, deleteControlor })(ListProcese);