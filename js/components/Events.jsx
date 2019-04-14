import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./MainHeader";
import "styles/events";
import EventCard from "./EventCard";
import EventsHeader from "./EventsHeader";
import EventModal from "./EventModal";
import ErrorDisplay from "./ErrorDisplay";
import WithEvents from "../containers/WithEvents";
import { dateToString, isDateFuture } from "../Utils";
import Spinner from "./Spinner";

class Events extends Component {
  state = {
    selectedFilter: "all",
    filters: ["all", "future", "past"],
    showDropdown: false,
    activeLayout: "column",
    activeEvtModal: false,
    serverError: false
  };

  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  componentDidUpdate(prevProps) {
    const { events } = this.props;
    if (events.length > prevProps.events.length) this.closeModal();
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
  handleOpenEvtModal = () => this.setState({ activeEvtModal: true });

  parseDate = evtDate => dateToString(evtDate);
  setEvtBtn(id, attendees, start) {
    const { currentUser } = this.props;
    if (!isDateFuture(new Date(start))) {
      return { type: "expired", method: "" };
    }
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
    const { tokenStillAvailable, joinEvt, leaveEvt } = this.props;
    if (tokenStillAvailable()) {
      action === "join" ? joinEvt(apiParam) : leaveEvt(apiParam);
    }
  };

  closeModal = () => {
    this.setState({ activeEvtModal: false });
  };

  edit = () => null;
  render() {
    const {
      selectedFilter,
      filters,
      showDropdown,
      activeLayout,
      activeEvtModal,
      serverError
    } = this.state;
    const open = showDropdown ? "open" : "";
    const activeEvt = activeEvtModal ? "openModal" : "";
    const { events } = this.props;
    if (serverError)
      return (
        <div className="events error">
          <ErrorDisplay />
        </div>
      );
    return (
      <div className={`events wrapper ${activeEvt}`}>
        <Header isOnAuth={activeEvt ? true : ""} />
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
                      button={this.setEvtBtn(
                        evt.owner.id,
                        evt.attendees,
                        evt.startsAt
                      )}
                      layout={activeLayout}
                      id={evt.id}
                    />
                  ))}
              </div>
            )}
            {!events.length && <Spinner />}
            <button
              onClick={this.handleOpenEvtModal}
              className="events__create--btn"
            >
              +
            </button>
          </main>
        )}
        {activeEvtModal && (
          <EventModal
            handleCloseModal={this.closeModal}
            apiError={this.props.apiError}
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

Events.propTypes = {
  tokenStillAvailable: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  joinEvt: PropTypes.func.isRequired,
  leaveEvt: PropTypes.func.isRequired,
  createEvt: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  apiError: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default WithEvents(Events);
