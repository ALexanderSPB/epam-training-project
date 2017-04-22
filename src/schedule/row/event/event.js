import React, { PropTypes } from 'react';

export default function Event({name, teacher, location, room, date, top, height, isActive}) {
    function getTime(date) {
        return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
    }

    return (
        <div
            className="event"
            style={{
                top : top + 'px',
                height: height + 'px'
            }}
        >
            <p className="additional">
                {`${getTime(date)} ${room}, ${location}`}
            </p>
            <p className="name">{name}</p>
            <p className="additional">{teacher}</p>
        </div>
    )
}

Event.propTypes = {
    height: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    top: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired
};