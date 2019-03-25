import React, { Component } from "react";
import { Form, Button, Label, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {

  state = {
    data: {
      name: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: { ...data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = () => {
    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      submit(data)
        .catch((error => this.setState({ errors: error.response.data.errors, loading: false })));
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Introdu nume!";
    if (!data.password) errors.password = "Introdu parola!";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>
          <Message.Header>
            Ceva nu e in regula
            <p>{errors.global}</p>
          </Message.Header> </Message>}
        <Form.Field error={!!errors.name}>
          <Label htmlFor="name">Nume</Label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name}/>}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <Label htmlFor="password">Parola</Label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password}/>}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm; 