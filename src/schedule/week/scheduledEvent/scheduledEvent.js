import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as formats from '../../../constants/dateTimeFormats';
import Edit from './modal/editEvent';

export default function ScheduledEvent({uuid, name, teacher, location, room, date, top, height, isActive, isEditable}) {
    function getTime(date) {
        return moment(date).format(formats.hoursAndMinutes);
    }

    return (
        <div
            className={isActive ? 'event event--active' : 'event'}
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
            {isEditable ? <Edit uuid={uuid}/> : null}
        </div>
    );
}

ScheduledEvent.propTypes = {
    uuid: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    top: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
    isEditable: PropTypes.bool
};
