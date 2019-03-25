/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Icon, Label } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class AddControlorForm extends React.Component {
  state = {
    data: {
      marca: "",
      nume: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    return this.setState({
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
    if (!data.marca) errors.marca = "Campul nu poate fi gol";
    if (!data.nume) errors.nume = "Campul nu poate fi gol";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>

        <Form.Field error={!!errors.marca}>
          <Label htmlFor="marca">Marca</Label>
          <input type="text"
                 id="marca"
                 name="marca"
                 placeholder="marca"
                 value={data.marca}
                 onChange={this.onChange}/>
          {errors.marca && <InlineError text={errors.marca}/>}
        </Form.Field>

        <Form.Field error={!!errors.nume}>
          <Label htmlFor="nume">Nume</Label>
          <input type="text"
                 id="nume"
                 name="nume"
                 placeholder="nume"
                 value={data.nume}
                 onChange={this.onChange}/>
          {errors.nume && <InlineError text={errors.nume}/>}
        </Form.Field>

        <Button icon labelPosition='right' primary><Icon name='plus square outline' size='big'/>Adauga</Button>
      </Form>
    );
  }
}

AddControlorForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddControlorForm;