import React, { PropTypes } from 'react';
import TimeGrid from './timeGrid';
import ScheduledEvent from './scheduledEvent/scheduledEvent';
import { daysOfWeek, scheduleCellHeight } from './../../constants';

export default function Week({officeHours, events}) {
    const tableHeight = scheduleCellHeight * (officeHours.closing - officeHours.opening);

    let eventsByDay = [];
    daysOfWeek.forEach(function (event, i) {
        eventsByDay[i] = [];
    });

    events.forEach(function (event) {
        eventsByDay[event.timing.beginning.getDay()].push(event);
    });

    function eventsOfDay(events, openingHour, cellHeight) {
       return events.map(event =>
           <ScheduledEvent
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
                        <TimeGrid
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

Week.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};