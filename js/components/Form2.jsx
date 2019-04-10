import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/form";
import { firstLetterUppercase, validateEmail } from "../Utils";

class Form2 extends Component {
  state = {
    types: { email: true, password: true, date: true, time: true }
  };
  componentDidMount() {
    const { fields } = this.props;
    fields.forEach(field =>
      this.setState({ [field]: { value: "", error: "" } })
    );
    console.log("done");
  }

  strValidation = ({ target }) => {
    const field = target.name;
    const value = target.value;
    if (!value)
      return this.setState({
        [field]: { value, error: `${target.placeholder} cannot be empty` }
      });
    this.setState({ [field]: { value, error: "" } });
  };

  emailValidation = ({ target }) => {
    const field = target.name;
    const value = target.value;
    if (!value)
      return this.setState({
        [field]: { value, error: `${target.placeholder} cannot be empty` }
      });
    if (!validateEmail(value))
      return this.setState({
        [field]: {
          value,
          error: `Email pattern: [a-z](\\w*)+@strv.com`
        }
      });
    this.setState({ [field]: { value, error: "" } });
  };

  validateInputs() {
    const { fields } = this.props;
    let error = false;
    fields.forEach(field => {
      const fieldName = firstLetterUppercase(field);
      if (!this.state[field].value) {
        this.setState(prev => ({
          [field]: {
            error: `${fieldName} cannot be empty`,
            value: prev[field].value
          }
        }));
        error = true;
      } else if (this.state[field].error) error = true;
    });

    return error;
  }

  clearErrors() {
    console.log();
    const { apiError, clearApiError } = this.props;
    if (apiError) clearApiError();
  }

  dataFromFields() {
    const { fields } = this.props;
    const data = {};
    fields.forEach(field => (data[field] = this.state[field].value));
    return data;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearErrors();

    const errors = this.validateInputs();
    if (errors) return;

    const { sendData, setupData } = this.props;
    let data = this.dataFromFields();
    if (setupData) data = setupData(data);
    sendData(data);
  };

  render() {
    const { fields, btnLabel, title, byline, link, apiError } = this.props;
    const error = apiError ? "error" : "";
    return (
      <form
        noValidate
        className={`form-component ${error}`}
        onSubmit={this.handleSubmit}
      >
        <legend>{title}</legend>
        {apiError ? (
          <p className="form-component__apiError">{apiError}</p>
        ) : (
          <sub>{byline}</sub>
        )}

        {fields.map(field => {
          const type = this.state.types[field] ? field : "text";
          const error = this.state[field]
            ? this.state[field].error
              ? this.state[field].error
              : ""
            : "";
          const validator = this[`${type}Validation`]
            ? this[`${type}Validation`]
            : this.strValidation;
          return (
            <p key={field}>
              <span className="form-component__annot">
                {this.state[field]
                  ? this.state[field].value
                    ? field
                    : ""
                  : ""}
              </span>
              <input
                type={type}
                placeholder={firstLetterUppercase(field)}
                className={`form-component__input ${error}`}
                onChange={validator}
                name={field}
              />
              {
                <span className="form-component__input-error">
                  {error ? error : ""}
                </span>
              }
            </p>
          );
        })}
        {link && (
          <Link
            className="form-component__bottomLink"
            to={`/${link.href}`}
            escape="false"
          >
            {link.text}
            <em> {link.extra}</em>
          </Link>
        )}
        <button
          className="form-component__submit"
          type="submit"
          onSubmit={this.handleSubmit}
        >
          {btnLabel}
        </button>
      </form>
    );
  }
}
export default Form2;
