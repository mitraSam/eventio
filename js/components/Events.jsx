import React, { Component } from "react";
import Header from "./Header";
import "styles/events";
import "styles/spinner";

import EventCard from "./EventCard";
import EventsHeader from "./EventsHeader";
import EventModal from "./EventModal";
import ErrorDisplay from "./ErrorDisplay";
import WithEvents from "../containers/WithEvents";

class Events extends Component {
  state = {
    selectedFilter: "all",
    filters: ["all", "future", "past"],
    showDropdown: false,
    activeLayout: "column",
    activeEvtModal: false,
    serverError: false
  };

  componentDidUpdate(prevProps) {
    const { events } = this.props;
    if (events.length > prevProps.events.length) this.closeModal();
  }

  componentDidMount() {
    const { tokenStillAvailable, history } = this.props;
    if (!tokenStillAvailable()) return history.push("/login");
    const { getEvents } = this.props;
    getEvents();
  }

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
    const { tokenStillAvailable, history, joinEvt, leaveEvt } = this.props;
    if (tokenStillAvailable()) {
      action === "join" ? joinEvt(apiParam) : leaveEvt(apiParam);
    } else history.push("/login");
  };

  closeModal = () => {
    this.setState({ activeEvtModal: false });
  };

  addEvent = () => this.props.createEvt();

  edit = () => console.log("to be implemented");
  render() {
    const {
      selectedFilter,
      filters,
      showDropdown,
      activeLayout,
      activeEvtModal,
      serverError
    } = this.state;
    const { history, events } = this.props;
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
            {events && (
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
            {!events.length && (
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
          <EventModal
            closeModal={this.closeModal}
            apiError={this.props.apiError}
            history={history}
            tokenStillAvailable={this.props.tokenStillAvailable}
            createEvt={this.props.createEvt}
            clearErrors={this.props.clearErrors}
            addEvent={this.props.createEvt}
          />
        )}
      </div>
    );
  }
}

export default WithEvents(Events);
