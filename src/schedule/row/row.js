import React, { PropTypes } from 'react';
import Background from './background';
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
                    date={event.timing.beginning}
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
                className="time-cell"
                style={{height: cellHeight + 'px'}}
            >
                {hour}
            </div>
        )
    }

    return (
        <tbody>
            <tr>
                <th
                    scope="row"
                    className="time-col"
                >
                    {timeColumn(officeHours.opening, officeHours.closing, scheduleCellHeight)}
                </th>
                {eventsByDay.map((events, i) => //columns for each day of week
                    <td
                        key={`${i}day`}
                        className="week-col"
                        style={{height: tableHeight + 'px'}}
                    >
                        <Background
                            cellHeight={scheduleCellHeight}
                            numOfCells={officeHours.closing - officeHours.opening}
                        />
                        {eventsOfDay(events, officeHours.opening, scheduleCellHeight)}
                    </td>
                )}
            </tr>
        </tbody>
    )
}

Row.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};