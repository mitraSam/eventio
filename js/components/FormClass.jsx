import { Component } from "react";
import { getUserFromToken, setUserToken, validateEmail } from "../Utils";
class FormClass extends Component {
  finishAuth = response => {
    const { setUser, history } = this.props;
    setUserToken(response.headers.authorization);
    setUser(getUserFromToken());
    history.push("/events");
  };

  handleText = ({ target }) => {
    const value = target.value;
    const name = target.name;
    if (!value) return this.setEmptyField(name);
    this.setField(name, target.value, "");
  };

  isDateFuture(date) {
    return date.getTime() > new Date().getTime();
  }

  handleDate = ({ target }) => {
    const value = target.value;
    const startsAt = target.valueAsDate;
    if (!value) return this.setEmptyField("date");
    if (this.isDateFuture(startsAt)) {
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
      if (!this.isDateFuture(startsAt)) {
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
    const { value } = target;
    if (!value) return this.setEmptyField("capacity");
    if (Number(value) && Number(value) > 0)
      return this.setField("capacity", target.value, "");
    this.setField("capacity", target.value, "Capacity has to be a positive nr");
  };

  handleTime = ({ target }) => {
    const value = target.value;
    const { startsAt } = this.state;

    if (!value) return this.setEmptyField(name);
    if (startsAt) {
      if (this.isTimePast(target.value)) return;
    }
    this.setField("time", target.value, "");
  };

  handleEmail = ({ target }) => {
    if (!target.value) return this.setEmptyField("email");
    if (validateEmail(target.value))
      return this.setField("email", target.value, "");
    this.setField("email", target.value, "Email pattern [a-z](\\w*)+@strv.com");
  };

  checkForEmptyInputs() {
    const { fields } = this.state;
    let emptyInputs = false;
    fields.forEach(field => {
      if (!this.state[field].value) {
        this.setEmptyField(field);
        emptyInputs = true;
      }
    });
    return emptyInputs;
  }

  setEmptyField = field =>
    this.setState({
      [field]: { value: "", error: `${field} cannot be empty` }
    });
  setField = (field, value, error) =>
    this.setState({ [field]: { value, error } });

  clearErrors = () => this.setState({ apiError: "" });
}

export default FormClass;
