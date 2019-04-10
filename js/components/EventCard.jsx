import React from "react";

const EventCard = ({
  description,
  date,
  title,
  author,
  attendingNr,
  capacity,
  button,
  layout,
  id
}) => (
  <div className={`events__card ${layout}`}>
    <time dateTime={date}>{date}</time>
    <header>
      <h2>{title}</h2>
      <span className="events__card--author">{author}</span>
    </header>
    <p className="events__card--description">{description}</p>
    <span className="events__card--author--d">{author}</span>
    <div className="events__card--details">
      <span className="events__card--attendees">{`${attendingNr} of ${capacity}`}</span>
      <button
        data-id={id}
        data-action={button.type}
        className={`events__card--btn-${button.type}`}
        onClick={button.method}
      >
        {button.type}
      </button>
    </div>
  </div>
);

export default EventCard;
