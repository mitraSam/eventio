import React, { Component } from "react";
import Form2 from "./Form2";
import { getUserToken, postData, tokenAvailable } from "../Utils";
import ErrorDisplay from "./ErrorDisplay";

class EventModal extends Component {
  state = {
    apiError: false
  };

  handleSubmit = data => {
    const { addEvent } = this.props;
    if (tokenAvailable()) {
      const token = getUserToken();
      console.log(addEvent);
      postData("events", data, token)
        .then(addEvent)
        .catch(this.handleApiError);
    }
  };

  handleApiError = ({ response }) => {
    console.log(response);
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

  clearApiError = () => this.setState({ apiError: "" });

  setupData({ time, capacity, date, title, description }) {
    const startsAt = new Date(`${date} ${time}`).toISOString();
    return { capacity, title, description, startsAt };
  }
  render() {
    const { apiError, serverError } = this.state;
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
        <Form2
          title="Create new event."
          byline="Enter details below"
          fields={["title", "description", "date", "time", "capacity"]}
          btnLabel="Create new event"
          sendData={this.handleSubmit}
          setupData={this.setupData}
          apiError={apiError}
          clearApiError={this.clearApiError}
        />
      </div>
    );
  }
}
export default EventModal;
