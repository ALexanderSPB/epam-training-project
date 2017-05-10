import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as formats from '../../../constants/dateTimeFormats';

// eslint-disable-next-line no-unused-vars
export default function ScheduledEvent({name, teacher, location, room, date, top, height, isActive}) {
    function getTime(date) {
        return moment(date).format(formats.hoursAndMinutes);
    }

    return (
        <div
            className="event"
            style={{
                top: top + 'px',
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

ScheduledEvent.propTypes = {
    height: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    top: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired
};
