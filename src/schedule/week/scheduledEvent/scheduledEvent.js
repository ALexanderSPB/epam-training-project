import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as formats from '../../../constants/dateTimeFormats';
import Edit from './modal/editEvent';
import ViewEvent from './modal/viewEvent';

export default function ScheduledEvent({uuid, name, teacher, teacherId, location, locationId, group, duration, room, beginning, date, top, height, isActive, isEditable}) {
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
            <p className="name">{name}</p>
            <p className="additional">
                {`${getTime(date)} ${room}, ${location}`}
            </p>
            <p className="additional">{teacher}</p>
            {isEditable
                ? <Edit uuid={uuid}/>
                : <ViewEvent
                    uuid={uuid}
                    name={name}
                    beginning={beginning}
                    date={date}
                    teacher={teacher}
                    teacherId={teacherId}
                    location={location}
                    locationId={locationId}
                    room={room}
                    group={group}
                    duration={duration}
                    isActive={isActive}
                />
            }
        </div>
    );
}

ScheduledEvent.propTypes = {
    uuid: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    locationId: PropTypes.number,
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    teacherId: PropTypes.string,
    date: PropTypes.object.isRequired,
    beginning: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    duration: PropTypes.number,
    group: PropTypes.object,
    isActive: PropTypes.bool,
    isEditable: PropTypes.bool
};
