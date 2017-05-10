import React from 'react';
import PropTypes from 'prop-types';
import TimeGrid from './timeGrid';
import ScheduledEvent from './scheduledEvent/scheduledEvent';
import {daysOfWeek, scheduleCellHeight} from '../../constants/scheduleOptions';

export default function Week({officeHours, events}) {
    const tableHeight = scheduleCellHeight * (officeHours.closing - officeHours.opening);

    let eventsByDay = [];
    daysOfWeek.forEach((event, i) => {
        eventsByDay[i] = [];
    });

    events.forEach(event => {
        eventsByDay[new Date(event.timing.beginning).getDay()].push(event);
    });

    function eventsOfDay(events, openingHour, cellHeight) {
        return events.map(event =>
            <ScheduledEvent
                key={event.uuid}
                name={event.name}
                teacher={event.teacher.name}
                location={event.location.name}
                room={event.room}
                date={new Date(event.timing.beginning)}
                top={(new Date(event.timing.beginning).getHours() - openingHour) * cellHeight}
                height={event.timing.duration * cellHeight}
                isActive={true}
            />
        );
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
        );
    }

    return (
        <tbody>
        <tr>
            <th
                scope='row'
                className='time-col'
            >
                {timeColumn(officeHours.opening, officeHours.closing, scheduleCellHeight)}
            </th>
            {eventsByDay.map((events, i) => //columns for each day of week
                <td
                    key={`${i}day`}
                    className='week-col'
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
    );
}

Week.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};
