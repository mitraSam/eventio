import { Component } from "react";
import PropTypes from "prop-types";
import {
  getUserFromToken,
  setUserToken,
  validateEmail,
  isDateFuture
} from "../Utils";
class FormClass extends Component {
  finishAuth = response => {
    const { setUser, history } = this.props;
    setUserToken(response.headers.authorization);
    setUser(getUserFromToken());
    history.push("/events");
  };

  handleText = ({ target }) => {
    const { value, name, placeholder } = target;
    if (!value) return this.setEmptyField(name, placeholder);
    this.setField(name, target.value, "");
  };

  handleDate = ({ target }) => {
    const { value } = target;
    const startsAt = target.valueAsDate;
    if (!value) return this.setEmptyField("date", "Date");
    if (isDateFuture(startsAt)) {
      this.setState({ startsAt }, () => this.isTimePast());
      return this.setField("date", target.value, "");
    }
    return this.setField(
      "date",
      target.value,
      "Date has to be set in the future"
    );
  };

  isTimePast = targetValue => {
    const { time, startsAt } = this.state;
    const minSec = targetValue || time.value;

    if (minSec) {
      const t = minSec.split(":");
      startsAt.setHours(t[0]);
      startsAt.setMinutes(t[1]);
      if (!isDateFuture(startsAt)) {
        this.setField(
          "time",
          minSec.value,
          "Event has to be set in the future"
        );
        return true;
      }
    }
  };

  handleCapacity = ({ target }) => {
    const { value, placeholder } = target;
    if (!value) return this.setEmptyField("capacity", placeholder);
    if (Number(value) && Number(value) > 0)
      return this.setField("capacity", target.value, "");
    this.setField("capacity", target.value, "Capacity has to be a positive nr");
  };

  handleTime = ({ target }) => {
    const { value, placeholder } = target;
    const { startsAt } = this.state;

    if (!value) return this.setEmptyField(name, placeholder);
    if (startsAt) {
      if (this.isTimePast(target.value)) return;
    }
    this.setField("time", target.value, "");
  };

  handleEmail = ({ target }) => {
    if (!target.value) return this.setEmptyField("email", "Email");
    if (validateEmail(target.value))
      return this.setField("email", target.value, "");
    this.setField("email", target.value, "Email pattern [a-z](\\w*)+@strv.com");
  };

  checkForEmptyInputs(inputs) {
    inputs.pop();
    let emptyInputs = false;
    inputs.forEach(input => {
      const error = this.checkError(this.state[input.name]);
      if (error) emptyInputs = true;
      if (!input.value) {
        this.setEmptyField(input.name, input.placeholder);
        emptyInputs = true;
      }
    });
    return emptyInputs;
  }

  checkError = val => !!val.error;

  handleRepeatPassword = ({ target }) => {
    const { password } = this.state;
    const { value } = target;
    if (!value) return this.setEmptyField("repeatPassword", "Repeat password");
    if (password.value === value)
      return this.setField("repeatPassword", value, "");
    this.setField("repeatPassword", value, "Passwords do not match");
  };

  handlePassword = ({ target }) => {
    const { value } = target;
    const { repeatPassword } = this.state;

    if (!value) return this.setEmptyField("password", "Password");
    if (repeatPassword.value) {
      if (repeatPassword.value !== value)
        this.setField(
          "repeatPassword",
          repeatPassword.value,
          "Passwords do not match"
        );
      else this.setField("repeatPassword", repeatPassword.value, "");
    }
    this.setField("password", target.value, "");
  };

  setEmptyField = (field, placeholder) =>
    this.setState({
      [field]: { value: "", error: `${placeholder} cannot be empty` }
    });
  setField = (field, value, error) =>
    this.setState({ [field]: { value, error } });

  clearErrors = () => this.setState({ apiError: "" });
}

FormClass.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default FormClass;
