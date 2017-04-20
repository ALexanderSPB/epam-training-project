import React, { PropTypes } from 'react';
import { daysOfWeek, scheduleCellHeight } from './../constants';
import Cell from './cell/cell';

export default function Schedule({officeHours, events}) {
    const tableHeight = scheduleCellHeight * (officeHours.closing - officeHours.opening);

    function eventsOfDay(events, openingHour, cellHeight) {
        if (events.length > 0) {
            return events.map(event =>
                <Cell
                    key={event.uuid}
                    name={event.name}
                    teacher={event.teacher}
                    location={event.location}
                    room={event.room}
                    top={(event.timing.beginning.getHours() - openingHour) * cellHeight}
                    height={event.timing.duration * cellHeight}
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

    let eventsByDay = [];
    daysOfWeek.forEach(function (event, i) {
        eventsByDay[i] = [];
    });

    events.forEach(function (event) {
        eventsByDay[event.timing.beginning.getDay()].push(event);
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1">time</div>
                {daysOfWeek.map((day) => //generating head of "table"
                    <div
                        key={day}
                        className="col-md-1"
                    >
                        {day}
                    </div>
                )}
            </div>
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
        </div>
    )
}

Schedule.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};