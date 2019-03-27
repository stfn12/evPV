/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Icon, Label } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class NewProcesForm extends React.Component {
  state = {
    data: {
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
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = data => {
    const errors = {};
    if (!data.serie) errors.serie = "Campul nu poate fi gol";
    if (!data.numar) errors.numar = "Campul nu poate fi gol";
    if (!data.marca) errors.marca = "Campul nu poate fi gol";
    if (!data.contravenient) errors.contravenient = "Campul nu poate fi gol";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.serie}>
          <Label htmlFor="serie">Serie</Label>
          <input type="text"
                 id="serie"
                 name="serie"
                 placeholder="serie"
                 value={data.serie}
                 onChange={this.onChange}/>
          {errors.serie && <InlineError text={errors.serie}/>}
        </Form.Field>

        <Form.Field error={!!errors.numar}>
          <Label htmlFor="numar">Numar</Label>
          <input type="text"
                 id="numar"
                 name="numar"
                 placeholder="numar"
                 value={data.numar}
                 onChange={this.onChange}/>
          {errors.numar && <InlineError text={errors.numar}/>}
        </Form.Field>

        <Form.Field error={!!errors.data_proces}>
          <Label htmlFor="data_proces">Data intocmire</Label>
          <input type="date"
                 id="data_proces"
                 name="data_proces"
                 value={data.data_proces}
                 onChange={this.onChange}/>
          {errors.data_proces && <InlineError text={errors.data_proces}/>}
        </Form.Field>

        <Form.Field error={!!errors.marca}>
          <Label htmlFor="marca">Marca controlor</Label>
          <input type="number"
                 id="marca"
                 name="marca"
                 placeholder="marca"
                 value={data.marca}
                 onChange={this.onChange}/>
          {errors.marca && <InlineError text={errors.marca}/>}
        </Form.Field>

        <Form.Field error={!!errors.contravenient}>
          <Label htmlFor="contravenient">Contravenient</Label>
          <input type="text"
                 id="contravenient"
                 name="contravenient"
                 placeholder="nume contravenient"
                 value={data.contravenient}
                 onChange={this.onChange}/>
          {errors.contravenient && <InlineError text={errors.contravenient}/>}
        </Form.Field>

        <Form.Field error={!!errors.adresa}>
          <Label htmlFor="adresa">Adresa</Label>
          <input type="text"
                 id="adresa"
                 name="adresa"
                 placeholder="adresa"
                 value={data.adresa}
                 onChange={this.onChange}/>
          {errors.adresa && <InlineError text={errors.adresa}/>}
        </Form.Field>

        <Form.Field error={!!errors.suma}>
          <Label htmlFor="suma">Suma</Label>
          <input type="text"
                 id="suma"
                 name="suma"
                 placeholder="suma"
                 value={data.suma}
                 onChange={this.onChange}/>
          {errors.suma && <InlineError text={errors.suma}/>}
        </Form.Field>

        <Form.Field error={!!errors.mod_intocmire}>
          <Label htmlFor="mod_intocmire">Mod intocmire</Label>
          <input type="text"
                 id="mod_intocmire"
                 name="mod_intocmire"
                 placeholder="direct / refuz / lipsa"
                 value={data.mod_intocmire}
                 onChange={this.onChange}/>
          {errors.mod_intocmire && <InlineError text={errors.mod_intocmire}/>}
        </Form.Field>

        <Form.Field error={!!errors.platit}>
          <Label htmlFor="platit">Platit</Label>
          <input type="text"
                 id="platit"
                 name="platit"
                 placeholder="da / nu"
                 value={data.platit}
                 onChange={this.onChange}/>
          {errors.platit && <InlineError text={errors.platit}/>}
        </Form.Field>

        <Form.Field error={!!errors.numar_chitanta}>
          <Label htmlFor="numar_chitanta" color="red">Numar chitanta</Label>
          <input type="text"
                 id="numar_chitanta"
                 name="numar_chitanta"
                 placeholder="Numar chitanta"
                 value={data.numar_chitanta}
                 onChange={this.onChange}/>
          {errors.numar_chitanta && <InlineError text={errors.numar_chitanta}/>}
        </Form.Field>

        <Form.Field error={!!errors.data_chitanta}>
          <Label htmlFor="data_chitanta" color="red">Data chitanta</Label>
          <input type="date"
                 id="data_chitanta"
                 name="data_chitanta"
                 placeholder="Data chitanta"
                 value={data.data_chitanta}
                 onChange={this.onChange}/>
          {errors.data_chitanta && <InlineError text={errors.data_chitanta}/>}
        </Form.Field>

        <Form.Field error={!!errors.suma_chitanta}>
          <Label htmlFor="suma_chitanta" color="red">Suma achitata</Label>
          <input type="text"
                 id="suma_chitanta"
                 name="suma_chitanta"
                 placeholder="Suma achitata"
                 value={data.suma_chitanta}
                 onChange={this.onChange}/>
          {errors.suma_chitanta && <InlineError text={errors.suma_chitanta}/>}
        </Form.Field>
        <Button icon labelPosition='right' primary><Icon name='plus square outline' size='big'/>Adauga</Button>
        {errors.global && <InlineError text={errors.global}/>}
      </Form>
    );
  }
}

NewProcesForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default NewProcesForm;
