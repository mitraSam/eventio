import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './MainHeader';
import 'styles/events';
import EventCard from './EventCard';
import EventsHeader from './EventsHeader';
import EventModal from './EventModal';
import ErrorDisplay from './ErrorDisplay';
import WithEvents from '../containers/WithEvents';
import {dateToString, isDateFuture, shortenText} from '../Utils';
import Spinner from './Spinner';

class Events extends Component {
    state = {
        selectedFilter: 'all',
        filters: ['all', 'future', 'past'],
        showDropdown: false,
        activeLayout: 'column',
        activeEvtModal: false,
        serverError: false,
    };

    componentDidMount() {
        const {getEvents} = this.props;
        /* loads events from server => triggers reducer action */
        getEvents();
    }

    componentDidUpdate(prevProps) {
        const {events} = this.props;

        /* check if there was an event added to the events array */
        if (events.length > prevProps.events.length) this.closeModal();
    }

    modifyDropdown = () => {
        /* close || open mobile filter dropdown */
        const {showDropdown} = this.state;
        this.setState({showDropdown: !showDropdown});
    };

    setFilter = ({target}) =>
        this.setState({
            selectedFilter: target.dataset['filter'],
            showDropdown: false,
        });

    /* modify events card layout */
    changeLayout = ({target}) => this.setState({activeLayout: target.dataset['style']});

    /*  apply time filters according to the current date */
    applyFilter = evtDate => {
        const currentTime = new Date().getTime();
        const evtTime = new Date(evtDate).getTime();
        const {selectedFilter} = this.state;
        return selectedFilter === 'all'
            ? true
            : selectedFilter === 'future'
            ? currentTime < evtTime
            : currentTime > evtTime;
    };

    handleOpenEvtModal = () => this.setState({activeEvtModal: true});

    /* returns a string containing the event date parsed according to design specifications */
    parseDate = evtDate => dateToString(evtDate);

    /* set event card button */
    setEvtBtn(id, attendees, start, capacity) {
        const {currentUser} = this.props;

        /* if startAt event prop is referencing a past date, the button gets no method for it's onChange prop */
        if (!isDateFuture(new Date(start))) {
            return {type: 'expired', method: null};
        }

        /* likewise if the event has reached it's capacity, no onChange action will be available */
        if (attendees.length === capacity) {
            return {type: 'packed', method: null};
        }
        /*
         check if current user is the author of the event || if it's attending it or not and return corresponding type
         * */
        const type =
            currentUser.id === id ? 'edit' : attendees.find(user => user._id === currentUser.id) ? 'leave' : 'join';
        const method = type === 'edit' ? this.edit : this.updateAttendance;
        return {type, method};
    }

    updateAttendance = ({target}) => {
        const id = target.dataset['id'];
        const action = target.dataset['action'];
        const apiParam = `events/${id}/attendees/me`;
        const {tokenStillAvailable, joinEvt, leaveEvt} = this.props;
        if (tokenStillAvailable()) {
            /* update the event by adding || removing the current user from its attendees => triggers reducer action */
            action === 'join' ? joinEvt(apiParam) : leaveEvt(apiParam);
        }
    };

    closeModal = () => {
        this.setState({activeEvtModal: false});
    };

    edit = () => null;
    render() {
        const {selectedFilter, filters, showDropdown, activeLayout, activeEvtModal, serverError} = this.state;
        const open = showDropdown ? 'open' : '';
        const activeEvt = activeEvtModal ? 'openModal' : '';
        const {events} = this.props;
        if (serverError)
            return (
                <div className="events error">
                    <ErrorDisplay />
                </div>
            );
        return (
            <div className={`events wrapper ${activeEvt}`}>
                <Header isOnAuth={!!activeEvt} />
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
                                                activeLayout === 'row' ? shortenText(evt.description) : evt.description
                                            }
                                            attendingNr={evt.attendees.length}
                                            capacity={evt.capacity}
                                            date={this.parseDate(evt.startsAt)}
                                            author={`${evt.owner.firstName} ${evt.owner.lastName}`}
                                            button={this.setEvtBtn(
                                                evt.owner.id,
                                                evt.attendees,
                                                evt.startsAt,
                                                evt.capacity
                                            )}
                                            layout={activeLayout}
                                            id={evt.id}
                                        />
                                    ))}
                            </div>
                        )}
                        {!events.length && <Spinner />}
                        <button onClick={this.handleOpenEvtModal} className="events__create--btn">
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
    currentUser: PropTypes.object.isRequired,
};

export default WithEvents(Events);
