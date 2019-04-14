import React from 'react';
import PropTypes from 'prop-types';
import 'styles/eventCard';
const EventCard = ({description, date, title, author, attendingNr, capacity, button, layout, id}) => (
    <div className={`events__card ${layout}`}>
        <time dateTime={date}>{date}</time>
        <header>
            <h2>{title}</h2>
            <span className="events__card__author">{author}</span>
        </header>
        <p className="events__card__description">{description}</p>
        <span className="events__card__author hideOnMobile">{author}</span>
        <div className="events__card__details">
            <span className="events__card__attendees">{`${attendingNr} of ${capacity}`}</span>
            <button
                data-id={id}
                data-action={button.type}
                className={`events__card__btn-${button.type}`}
                onClick={button.method}>
                {button.type}
            </button>
        </div>
    </div>
);

EventCard.propTypes = {
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    attendingNr: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    button: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
};

export default EventCard;
