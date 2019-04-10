import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/form";
import { firstLetterUppercase, validateEmail } from "../Utils";

class Form extends Component {
  state = {
    errors: [],
    errorMsg: {
      text: "Field cannot be empty or contain whitespace",
      password: "Pssword cannot be empty",
      email: "Email has to follow pattern"
    },
    types: { email: true, password: true }
  };
  componentDidMount() {
    const { fields } = this.props;
    fields.forEach(field => this.setState({ [field.name]: "" }));
  }
  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  strValidation = value => value.length > 0;

  emailValidation = value => validateEmail(value);

  validateInputs = inputsArray => {
    inputsArray.pop();
    let errorContainer = [];
    inputsArray.forEach(input => {
      const fnName = `${input.name}Validation`;
      /* check if  the component has validation fn for specific input eg emailValidation;
       * if not default to strValidation
       * */
      let validationFn =
        typeof this[fnName] === "function" ? this[fnName] : this.strValidation;
      const validValue = validationFn(input.value);
      if (!validValue) errorContainer.push(input.name);
    });
    return errorContainer;
  };

  clearErrors() {
    this.props.clearAuthError();
    this.setState({ errors: [] });
  }

  dataFromFields() {
    const { fields } = this.props;
    const data = {};
    fields.forEach(field => (data[field] = this.state[field]));
    return data;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearErrors();

    const inputsArray = Array.from(e.target.elements);
    const errors = this.validateInputs(inputsArray);
    if (errors.length !== 0) this.setState({ errors });
    else {
      const { sendData } = this.props;
      const data = this.dataFromFields();
      sendData(data);
    }
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
          <p className="form-component__authError">{apiError}</p>
        ) : (
          <sub>{byline}</sub>
        )}

        {fields.map(field => {
          const type = this.state.types[field] ? field : "text";
          const error = this.state.errors.includes(field) ? "error" : "";
          return (
            <p key={field}>
              <span className="form-component__annot">
                {this.state[field] ? field : ""}
              </span>
              <input
                type={type}
                placeholder={firstLetterUppercase(field)}
                className={`form-component__input ${error}`}
                onChange={this.handleFieldChange}
                name={field}
              />
              {
                <span className="form-component__input-error">
                  {error ? this.state.errorMsg[type] : ""}
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
export default Form;
