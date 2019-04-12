import React from "react";
import ErrorDisplay from "./ErrorDisplay";
import "styles/form";
import FormClass from "./FormClass";

class EventModal extends FormClass {
  state = {
    apiError: "",
    serverError: "",
    title: { value: "", error: "" },
    description: { value: "", error: "" },
    capacity: { value: "", error: "" },
    date: { value: "", error: "" },
    time: { value: "", error: "" },
    startsAt: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.checkForEmptyInputs(Array.from(e.target.elements))) {
      const {
        addEvent,
        clearErrors,
        tokenStillAvailable,
        history
      } = this.props;
      if (tokenStillAvailable()) {
        const data = this.dataFromFields();
        clearErrors();
        addEvent(data);
      } else {
        history.push("/login");
      }
    }
  };

  dataFromFields = () => {
    const { title, description, capacity, startsAt, time } = this.state;
    const t = time.value.split(":");
    startsAt.setHours(t[0]);
    startsAt.setMinutes(t[1]);
    return {
      title: title.value,
      description: description.value,
      capacity: capacity.value,
      startsAt
    };
  };

  handleApiError = ({ response }) => {
    const fields = ["startsAt", "title", "description"];
    if (!response) return this.setState({ serverError: true });

    const { errors } = response.data;
    if (Array.isArray(errors))
      return this.setState({
        apiError: errors[0].message
      });
    fields.forEach(field => {
      if (field in errors)
        return this.setState({
          apiError: errors[field].message
        });
    });
  };

  render() {
    const {
      serverError,
      title,
      description,
      date,
      time,
      capacity
    } = this.state;
    const { apiError } = this.props;
    const error = apiError ? "error" : "";

    if (serverError)
      return (
        <div className="events error">
          <ErrorDisplay />
        </div>
      );

    return (
      <div className="events__form-wrapper">
        <button onClick={this.props.closeModal} className="events__close-modal">
          <span>Close</span>
        </button>
        <form
          noValidate
          className={`form-component ${error}`}
          onSubmit={this.handleSubmit}
        >
          <legend>Create new event</legend>
          {apiError ? (
            <p className="form-component__apiError">{apiError}</p>
          ) : (
            <sub>Enter your details below</sub>
          )}
          <p>
            <span className="form-component__annot">
              {title.value ? "Title" : ""}
            </span>
            <input
              type="text"
              placeholder="title"
              className={`form-component__input ${error}`}
              onChange={this.handleText}
              name="title"
              value={title.value}
            />
            <span className="form-component__input-error">
              {title.error ? title.error : ""}
            </span>
          </p>
          <p>
            <span className="form-component__annot">
              {description.value ? "Description" : ""}
            </span>
            <input
              type="text"
              placeholder="Description"
              className={`form-component__input ${error}`}
              onChange={this.handleText}
              name="description"
              value={description.value}
            />
            <span className="form-component__input-error">
              {description.error ? description.error : ""}
            </span>
          </p>
          <p>
            <span className="form-component__annot">
              {date.value ? "Date" : ""}
            </span>
            <input
              type="date"
              placeholder="Date"
              className={`form-component__input ${error}`}
              onChange={this.handleDate}
              name="date"
              value={date.value}
            />
            <span className="form-component__input-error">
              {date.error ? date.error : ""}
            </span>
          </p>
          <p>
            <span className="form-component__annot">
              {time.value ? "Time" : ""}
            </span>
            <input
              type="time"
              placeholder="Time"
              className={`form-component__input ${error}`}
              onChange={this.handleTime}
              name="time"
              value={time.value}
            />
            <span className="form-component__input-error">
              {time.error ? time.error : ""}
            </span>
          </p>
          <p>
            <span className="form-component__annot">
              {capacity.value ? "Capacity" : ""}
            </span>
            <input
              type="text"
              placeholder="Capacity"
              className={`form-component__input ${error}`}
              onChange={this.handleCapacity}
              name="capacity"
              value={capacity.value}
            />
            <span className="form-component__input-error">
              {capacity.error ? capacity.error : ""}
            </span>
          </p>

          <button
            className="form-component__submit"
            type="submit"
            onSubmit={this.handleSubmit}
          >
            Create new event
          </button>
        </form>
      </div>
    );
  }
}
export default EventModal;
