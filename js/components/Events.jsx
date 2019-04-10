import React, { Component } from "react";
import Header from "./Header";
import "styles/events";
import "styles/spinner";

import { getData, getUserToken, postData, deleteData } from "../Utils";
import EventCard from "./EventCard";
import WithCurrentUser from "../containers/WithCurrentUser";
import EventsHeader from "./EventsHeader";
import EventModal from "./EventModal";
import ErrorDisplay from "./ErrorDisplay";

class Events extends Component {
  state = {
    selectedFilter: "all",
    filters: ["all", "future", "past"],
    showDropdown: false,
    activeLayout: "column",
    events: [],
    activeEvtModal: false,
    serverError: false,
    loadingEvts: true
  };
  componentDidMount() {
    const { tokenStillAvailable, history } = this.props;
    if (!tokenStillAvailable()) history.push("/login");
    getData("events")
      .then(this.eventsFromData)
      .catch(this.handleError);
  }

  handleError = () => this.setState({ serverError: true });

  eventsFromData = ({ data }) => {
    this.setState({ loadingEvts: false });
    this.setState({ events: data });
  };

  modifyDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  };

  setFilter = ({ target }) =>
    this.setState({
      selectedFilter: target.dataset["filter"],
      showDropdown: false
    });

  changeLayout = ({ target }) =>
    this.setState({ activeLayout: target.dataset["style"] });

  applyFilter = evtDate => {
    const currentTime = new Date().getTime();
    const evtTime = new Date(evtDate).getTime();
    const { selectedFilter } = this.state;
    return selectedFilter === "all"
      ? true
      : selectedFilter === "future"
      ? currentTime < evtTime
      : currentTime > evtTime;
  };

  shortenText = str => str.slice(0, 30).concat("...");
  openEvtModal = () => this.setState({ activeEvtModal: true });
  parseDate(evtDate) {
    const options = {
      timeZone: "Europe/Prague",
      year: "numeric",
      minute: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric"
    };
    const date = new Date(evtDate);
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(
      date,
      options
    );
    return formatedDate.replace(/,([^,]*)$/, " - $1");
  }
  setEvtBtn(id, attendees) {
    const { currentUser } = this.props;
    const type =
      currentUser.id === id
        ? "edit"
        : attendees.find(user => user._id === currentUser.id)
        ? "leave"
        : "join";
    const method = type === "edit" ? this.edit : this.updateAttendance;
    return { type, method };
  }

  updateAttendance = ({ target }) => {
    const id = target.dataset["id"];
    const action = target.dataset["action"];
    const apiParam = `events/${id}/attendees/me`;
    const { tokenStillAvailable, history } = this.props;
    if (tokenStillAvailable()) {
      const token = getUserToken();
      action === "join"
        ? postData(apiParam, {}, token)
            .then(this.updateEvents)
            .catch(console.log)
        : deleteData(apiParam, token)
            .then(this.updateEvents)
            .catch(res => console.log(JSON.stringify(res)));
    } else history.push("/login");
  };

  updateEvents = ({ data }) => {
    const { events } = this.state;
    const evtIndex = events.findIndex(evt => evt.id === data.id);
    events.splice(evtIndex, 1, data);
    this.setState({ events });
  };
  addEvent = ({ data }) => {
    const { events } = this.state;
    this.setState({ events: [data, ...events] });
    this.closeModal();
  };
  closeModal = () => {
    this.setState({ activeEvtModal: false });
  };

  edit = () => console.log("to be implemented");
  render() {
    const {
      selectedFilter,
      filters,
      showDropdown,
      activeLayout,
      events,
      activeEvtModal,
      loadingEvts,
      serverError
    } = this.state;
    const { history } = this.props;
    const open = showDropdown ? "open" : "";
    const activeEvt = activeEvtModal ? "evt-modal" : "";

    if (serverError)
      return (
        <div className="events error">
          <ErrorDisplay />
        </div>
      );
    return (
      <div className={`events wrapper ${activeEvt}`}>
        <Header history={history} hideLink={activeEvt ? true : ""} />
        {!activeEvtModal && (
          <main>
            <EventsHeader
              activeLayout={activeLayout}
              selectedFilter={selectedFilter}
              filters={filters}
              open={open}
              setFilter={this.setFilter}
              changeLayout={this.changeLayout}
              modifyDropdown={this.modifyDropdown}
            />
            {!loadingEvts && (
              <div className="events__container">
                {events
                  .filter(evt => this.applyFilter(evt.startsAt))
                  .map(evt => (
                    <EventCard
                      key={evt.id}
                      title={evt.title}
                      description={
                        activeLayout === "row"
                          ? this.shortenText(evt.description)
                          : evt.description
                      }
                      attendingNr={evt.attendees.length}
                      capacity={evt.capacity}
                      date={this.parseDate(evt.startsAt)}
                      author={`${evt.owner.firstName} ${evt.owner.lastName}`}
                      button={this.setEvtBtn(evt.owner.id, evt.attendees)}
                      layout={activeLayout}
                      id={evt.id}
                    />
                  ))}
              </div>
            )}
            {loadingEvts && (
              <div className="spinner-wrap">
                <div className="spinner">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <button onClick={this.openEvtModal} className="events__create--btn">
              +
            </button>
          </main>
        )}
        {activeEvtModal && (
          <EventModal closeModal={this.closeModal} addEvent={this.addEvent} />
        )}
      </div>
    );
  }
}

export default WithCurrentUser(Events);
