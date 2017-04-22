import React, { PropTypes } from 'react';
import Event from './event/event';
import { daysOfWeek, scheduleCellHeight } from './../../constants';

export default function Row({officeHours, events}) {
    const tableHeight = scheduleCellHeight * (officeHours.closing - officeHours.opening);

    let eventsByDay = [];
    daysOfWeek.forEach(function (event, i) {
        eventsByDay[i] = [];
    });

    events.forEach(function (event) {
        eventsByDay[event.timing.beginning.getDay()].push(event);
    });

    function eventsOfDay(events, openingHour, cellHeight) {
        if (events.length > 0) {
            return events.map(event =>
                <Event
                    key={event.uuid}
                    name={event.name}
                    teacher={event.teacher}
                    location={event.location}
                    room={event.room}
                    top={(event.timing.beginning.getHours() - openingHour) * cellHeight}
                    height={event.timing.duration * cellHeight}
                    isActive={true}
                />
            )
        }
    }

    function timeColumn(opening, closing, cellHeight) {
        let hours = [];

        for (let i = opening; i < closing; i++) {
            hours[i] = `${i}:00`;
        }
        return hours.map(hour =>
            <div
                key={hour}
                style={{height: cellHeight + 'px'}}
            >
                {hour}
            </div>
        )
    }

    return (
        <div className="row">
            <div className="col-md-1">
                {timeColumn(officeHours.opening, officeHours.closing, scheduleCellHeight)}
            </div>
            {eventsByDay.map((events, i) => //columns for each day of week
                <div
                    key={`${i}day`}
                    className="col-md-1"
                    style={{
                        height: tableHeight + 'px',
                        position: 'relative'
                    }}
                >
                    {eventsOfDay(events, officeHours.opening, scheduleCellHeight)}
                </div>
            )}
        </div>
    )
}

Row.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};